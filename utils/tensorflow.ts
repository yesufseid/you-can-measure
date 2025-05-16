// src/utils/tensorflow.ts
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

let model: cocoSsd.ObjectDetection | null = null;

export async function loadModel() {
  if (!model) {
    await tf.setBackend('webgl');
    await tf.ready();
    model = await cocoSsd.load();
    console.log("Model loaded!");
  }
}

export async function detectObjects(image: HTMLImageElement): Promise<number> {
  if (!model) await loadModel();

  const predictions = await model!.detect(image);

  // Only keep bottles
  const matchedObjects = predictions.filter((pred) =>
    pred.class.toLowerCase() === 'bottle'
  );

  let totalWeight = 0;

  matchedObjects.forEach((pred) => {
    const [x, y, width, height] = pred.bbox;
    const area = width * height;

    // Classify by area size
    let weight = 0;
    if (area < 5000) {
      weight = 15; // Small bottle (~0.5L) → 15g
    } else if (area < 15000) {
      weight = 25; // Medium bottle (~1L) → 25g
    } else {
      weight = 40; // Large bottle (~2L) → 40g
    }

    totalWeight += weight;
  });

  return totalWeight; // Total estimated weight in grams
}
