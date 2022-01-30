class AnalyseWorklet extends AudioWorkletProcessor {
  constructor() {
    super();
    this.volume = 0;

    this.port.onmessage = () => {
      this.port.postMessage(this.volume);
    };
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];

    if (input.length === 0) {
      return true;
    }

    let sum = 0;
    for (let channel = 0; channel < input.length; channel++) {
      let xs = input[channel];

      let max = 0;
      for (let i = 0; i < xs.length; i++) {
        const x = Math.abs(xs[i]);
        if (x > max) {
          max = x;
        }
      }

      sum += max;
    }

    this.volume = ((this.volume * 9) + (sum / input.length)) / 10;

    return true;
  }
}


registerProcessor('analyse-worklet', AnalyseWorklet);
