declare module "plotly.js-dist-min" {
  const Plotly: {
    newPlot: (
      root: HTMLElement | string,
      data: unknown[],
      layout?: unknown,
      config?: unknown,
    ) => Promise<unknown>;
    react?: (
      root: HTMLElement | string,
      data: unknown[],
      layout?: unknown,
      config?: unknown,
    ) => Promise<unknown>;
    purge: (id: string | HTMLElement) => void;
    Plots?: {
      resize: (root: string | HTMLElement) => void;
    };
  };
  export default Plotly;
}
