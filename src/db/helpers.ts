import lodash from "lodash";
import { LowSync } from "lowdb";
import db from "./index.js";

// Extend Low class with a new `chain` field
export class LowSyncWithLodash<T> extends LowSync<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

function prepareService(read?: boolean, write?: boolean) {
  return function readWriteService<T extends unknown[], U>(
    fn: (...args: T) => U
  ): (...args: T) => U {
    return function curried(...args: T) {
      read && db.read();
      const result = fn(...args);
      write && db.write();
      return result;
    };
  };
}

export const readWriteService = prepareService(true, true);
export const writeService = prepareService(false, true);
export const readService = prepareService(true, false);
