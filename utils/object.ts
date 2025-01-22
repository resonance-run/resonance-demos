const arrayPathRegex = /([a-zA-Z0-9-_]+)\[(\d*)\]/;
const numberRegex = /^\d+$/;
const nextSlotRegex = /__nextSlot__/;

export const insertValueAtPath = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  value: number | string | boolean | Record<string, unknown>,
  path: string
) => {
  const pathParts = path.split('.').reduce((res: string[], part) => {
    const arrayMatch = part.match(arrayPathRegex);
    if (arrayMatch) {
      return [...res, arrayMatch[1], arrayMatch[2] || '__nextSlot__'];
    }
    return [...res, part];
  }, []);
  value = typeof value === 'string' && numberRegex.test(value) ? +value : value;
  pathParts.forEach((part, index) => {
    const isLastValue = index === pathParts.length - 1;
    const nextIsArray =
      !isLastValue && (numberRegex.test(pathParts[index + 1]) || nextSlotRegex.test(pathParts[index + 1]));
    part = nextSlotRegex.test(part) && Array.isArray(obj) ? `${obj.length}` : part;
    if (!(part in obj)) {
      obj[part] = isLastValue ? value : nextIsArray ? [] : {};
      if (!isLastValue) {
        obj = obj[part];
      }
    } else {
      obj = obj[part];
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeAccessToPath = (obj: any, path: (string | number)[]) => {
  let pathKey = path.shift();
  let currentLevel = obj;
  while (pathKey !== undefined) {
    if (currentLevel && typeof currentLevel === 'object' && currentLevel !== null) {
      currentLevel = currentLevel[pathKey];
    }
    pathKey = path.shift();
  }
  return currentLevel;
};
