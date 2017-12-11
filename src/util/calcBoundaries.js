export default function (points) {
  console.log(points);
  let minx = 9999, miny = 9999, maxx = 0, maxy = 0;
  points.forEach(point => {
    if (point.x < minx) {
      minx = point.x;
    }
    if (point.x + point.width > maxx) {
      maxx = point.x + point.width;
    }
    if (point.y < miny) {
      miny = point.y;
    }
    if (point.y + point.height > maxy) {
      maxy = point.y + point.height;
    }
  });
  return {
    x: minx, y: miny, width: maxx - minx, height: maxy - miny,
  };
}