// types required for engine

export declare interface Options {
  '--help': boolean;
  '--version': boolean;
}

export declare type Arguments = Partial<Options> & {
  _: string[];
};
