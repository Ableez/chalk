interface IDataPoint {
  features: number[];
  label: string;
}
class KNN {
  private data: IDataPoint[];
  private k: number;
  constructor(data: IDataPoint[], k: number) {
    this.data = data;
    this.k = k;
  }
  private distance(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
  }
  private getNeighbors(instance: number[]): IDataPoint[] {
    const neighbors: IDataPoint[] = [];
    for (const dataPoint of this.data) {
      const dist = this.distance(instance, dataPoint.features);
      neighbors.push({ ...dataPoint, distance: dist });
    }
    neighbors.sort((a, b) => a.distance - b.distance);
    return neighbors.slice(0, this.k);
  }
  predict(instance: number[]): string {
    const neighbors = this.getNeighbors(instance);
    const labels: { [label: string]: number } = {};
    for (const neighbor of neighbors) {
      if (!labels[neighbor.label]) {
        labels[neighbor.label] = 0;
      }
      labels[neighbor.label]++;
    }
    let maxLabel = "";
    let maxCount = 0;
    for (const label in labels) {
      if (labels[label] > maxCount) {
        maxLabel = label;
        maxCount = labels[label];
      }
    }
    return maxLabel;
  }
} // Example usage: const data: IDataPoint[] = [ { features: [1, 2], label: 'A' }, { features: [2, 3], label: 'A' }, { features: [3, 4], label: 'B' }, { features: [4, 5], label: 'B' }, { features: [5, 6], label: 'C' }, ]; const knn = new KNN(data, 3); const instance = [3, 3]; console.log(knn.predict(instance)); // Output: 'A'
