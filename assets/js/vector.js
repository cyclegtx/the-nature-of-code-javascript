
var Vector = function() {
  this.x = arguments[0] || 0;
  this.y = arguments[1] || 0;
  this.z = arguments[2] || 0;
};
Vector.prototype.toString = function () {
  return 'Vector Object : ['+ this.x +', '+ this.y +', '+ this.z + ']';
};
Vector.prototype.set = function (x, y, z) {
  if (x instanceof Vector) {
    this.x = x.x || 0;
    this.y = x.y || 0;
    this.z = x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return this;
  }
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  return this;
};
Vector.prototype.copy = function () {
  return new Vector(this.x,this.y,this.z);
};
Vector.prototype.add = function (x, y, z) {
  if (x instanceof Vector) {
    this.x += x.x || 0;
    this.y += x.y || 0;
    this.z += x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x += x[0] || 0;
    this.y += x[1] || 0;
    this.z += x[2] || 0;
    return this;
  }
  this.x += x || 0;
  this.y += y || 0;
  this.z += z || 0;
  return this;
};

Vector.prototype.sub = function (x, y, z) {
  if (x instanceof Vector) {
    this.x -= x.x || 0;
    this.y -= x.y || 0;
    this.z -= x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x -= x[0] || 0;
    this.y -= x[1] || 0;
    this.z -= x[2] || 0;
    return this;
  }
  this.x -= x || 0;
  this.y -= y || 0;
  this.z -= z || 0;
  return this;
};
Vector.prototype.mult = function (n) {
  this.x *= n || 0;
  this.y *= n || 0;
  this.z *= n || 0;
  return this;
};
Vector.prototype.div = function (n) {
  this.x /= n;
  this.y /= n;
  this.z /= n;
  return this;
};
Vector.prototype.mag = function () {
  return Math.sqrt(this.magSq());
};
Vector.prototype.magSq = function () {
  var x = this.x, y = this.y, z = this.z;
  return (x * x + y * y + z * z);
};
Vector.prototype.dot = function (x, y, z) {
  if (x instanceof Vector) {
    return this.dot(x.x, x.y, x.z);
  }
  return this.x * (x || 0) +
         this.y * (y || 0) +
         this.z * (z || 0);
};
Vector.prototype.cross = function (v) {
  var x = this.y * v.z - this.z * v.y;
  var y = this.z * v.x - this.x * v.z;
  var z = this.x * v.y - this.y * v.x;
  return new Vector(x,y,z);
};
Vector.prototype.dist = function (v) {
  var d = v.copy().sub(this);
  return d.mag();
};
Vector.prototype.normalize = function () {
  return this.div(this.mag());
};
Vector.prototype.limit = function (l) {
  var mSq = this.magSq();
  if(mSq > l*l) {
    this.div(Math.sqrt(mSq)); //normalize it
    this.mult(l);
  }
  return this;
};
Vector.prototype.setMag = function (n) {
  return this.normalize().mult(n);
};
Vector.prototype.heading = function () {
  return Math.atan2(this.y, this.x);
};
Vector.prototype.rotate = function (a) {
  var newHeading = this.heading() + a;
  var mag = this.mag();
  this.x = Math.cos(newHeading) * mag;
  this.y = Math.sin(newHeading) * mag;
  return this;
};
Vector.prototype.lerp = function (x, y, z, amt) {
  if (x instanceof Vector) {
    return this.lerp(x.x, x.y, x.z, y);
  }
  this.x += (x - this.x) * amt || 0;
  this.y += (y - this.y) * amt || 0;
  this.z += (z - this.z) * amt || 0;
  return this;
};
Vector.prototype.array = function () {
  return [this.x || 0, this.y || 0, this.z || 0];
};
Vector.prototype.equals = function (x, y, z) {
  var a, b, c;
  if (x instanceof Vector) {
    a = x.x || 0;
    b = x.y || 0;
    c = x.z || 0;
  } else if (x instanceof Array) {
    a = x[0] || 0;
    b = x[1] || 0;
    c = x[2] || 0;
  } else {
    a = x || 0;
    b = y || 0;
    c = z || 0;
  }
  return this.x === a && this.y === b && this.z === c;
};


// Static Methods
Vector.fromAngle = function(angle) {
  return new Vector(Math.cos(angle),Math.sin(angle),0);
};
Vector.random2D = function () {
  var angle;
  angle = Math.random()*Math.PI*2;
  return this.fromAngle(angle);
};
Vector.random3D = function () {
  var angle,vz;
  angle = Math.random()*Math.PI*2;
  vz = Math.random()*2-1;
  var vx = Math.sqrt(1-vz*vz)*Math.cos(angle);
  var vy = Math.sqrt(1-vz*vz)*Math.sin(angle);
  return new Vector(vx,vy,vz);
};
Vector.add = function (v1, v2, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.add(v2);
  return target;
};
Vector.sub = function (v1, v2, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.sub(v2);
  return target;
};
Vector.mult = function (v, n, target) {
  if (!target) {
    target = v.copy();
  } else {
    target.set(v);
  }
  target.mult(n);
  return target;
};
Vector.div = function (v, n, target) {
  if (!target) {
    target = v.copy();
  } else {
    target.set(v);
  }
  target.div(n);
  return target;
};
Vector.dot = function (v1, v2) {
  return v1.dot(v2);
};
Vector.cross = function (v1, v2) {
  return v1.cross(v2);
};
Vector.dist = function (v1,v2) {
  return v1.dist(v2);
};
Vector.lerp = function (v1, v2, amt, target) {
  if (!target) {
    target = v1.copy();
  } else {
    target.set(v1);
  }
  target.lerp(v2, amt);
  return target;
};
Vector.angleBetween = function (v1, v2) {
  return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
};