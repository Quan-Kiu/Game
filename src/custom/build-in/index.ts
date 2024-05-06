import { CollisionBlock } from "../../classes/GameLevel";

Array.prototype.parse2D = function <T>(offset) {
  const result: T[] = [];
  for (let index = 0; index < this.length; index += offset) {
    result.push(this.slice(index, index + offset));
  }
  return result;
};
Array.prototype.remove = function (val, field) {
  const indexOfVal = this.findIndex((item) => item?.[field] == val);
  let data;
  if (indexOfVal >= 0) {
    this.splice(indexOfVal, 1);
    data = this[indexOfVal];
  } else {
  }
  return data;
};
Array.prototype.parseCollisions = function (object2D, size) {
  const conditionSymbol = [...new Set(this.filter((symbol) => symbol != 0))];

  const result: CollisionBlock[] = [];
  for (let index = 0; index < object2D.length; index++) {
    const row = object2D[index];
    const pY = index * size;
    row.forEach((symbol, rowIndex) => {
      if (conditionSymbol.includes(symbol)) {
        const pX = rowIndex * size;

        result.push(
          new CollisionBlock({
            position: { x: pX, y: pY },
            size,
          })
        );
      }
    });
  }
  return result;
};
