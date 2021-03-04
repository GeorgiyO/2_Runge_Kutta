export {rungeKutta, rungeKuttaSecondOrder};

let rungeKutta2 = (x0, y0, h, n, f) => {
    let k1, k2;
    let values = [{
        x: x0,
        y: y0
    }];
    for (let i = 0; i < n; i++) {
        let prev = values.last();

        k1 = h * f(prev.x, prev.y);
        k2 = h * f(prev.x + h, prev.y + k1);

        values.push({
            x: prev.x + h,
            y: prev.y + (k1 + k2) / 2
        });
    }
    return values;
}

let rungeKutta4 = (x0, y0, h, n, f) => {
    let k1, k2, k3, k4;
    let h2 = h/2;
    let values = [{
        x: x0,
        y: y0
    }];

    for (let i = 0; i < n; i++) {
        let prev = values.last();

        k1 = h * f(prev.x, prev.y);
        k2 = h * f(prev.x + h2, prev.y + k1/2);
        k3 = h * f(prev.x + h2, prev.y + k2/2);
        k4 = h * f(prev.x + h2, prev.y + k3);

        values.push({
            x: prev.x + h,
            y: prev.y + (k1 + 2*k2 + 2*k3 + k4) / 6
        });
    }
    return values;
}

let rungeKutta2SecondOrder = (x0, y0, z0, h, n, f) => {
    let k1, k2,
        l1, l2;
    let values = [{
        x: x0,
        y: y0,
        z: z0
    }];
    for (let i = 0; i < n; i++) {
        let prev = values.last();

        k1 = h * prev.z;
        l1 = h * f(prev.x, prev.y, prev.z);

        k2 = h * (prev.z + l1);
        l2 = h * f(prev.x + h, prev.y + k1, prev.z + l1);

        values.push({
            x: prev.x + h,
            y: prev.y + (k1 + k2) / 2,
            z: prev.z + (l1 + l2) / 2
        });
    }
    return values;
}

let rungeKutta4SecondOrder = (x0, y0, z0, h, n, f) => {
    let k1, k2, k3, k4,
        l1, l2, l3, l4;
    let values = [{
        x: x0,
        y: y0,
        z: z0
    }];
    for (let i = 0; i < n; i++) {
        let prev = values.last();

        k1 = h * prev.z;
        l1 = h * f(prev.x, prev.y, prev.z);

        k2 = h * (prev.z + l1/2);
        l2 = h * f(prev.x + h/2, prev.y + k1/2, prev.z + l1/2);

        k3 = h * (prev.z + l2/2);
        l3 = h * f(prev.x + h/2, prev.y + k2/2, prev.z + l2/2);

        k4 = h * (prev.z + l3);
        l4 = h * f(prev.x + h, prev.y + k3, prev.z + l3);

        values.push({
            x: prev.x + h,
            y: prev.y + (k1 + 2*k2 + 2*k3 + k4) / 6,
            z: prev.z + (l1 + 2*l2 + 2*l3 + l4) / 6
        });
    }
    return values;
}

/**
 * @param x0            - начальное значение х аргумента foo(x)
 * @param y0            - начальное значение у значения foo(x0)
 * @param h             - шаг итерации
 * @param iterations    - количество итераций
 * @param rk4           - boolean, если true, будет вызвана функция с точностью 4
 * @param foo           - функция f(x, z)
 * @returns [{x, z}]
 */
let rungeKutta = (x0, y0, h, iterations, rk4, foo) => {
    let args = [x0, y0, h, iterations, foo];
    return rk4 ? rungeKutta4(...args) : rungeKutta2(...args);
}

/**
 * z = y'
 * @param x0            - аргумент foo(t0)
 * @param y0            - значение foo'(t0)
 * @param z0            - значение foo(t0)
 * @param h             - шаг итерации
 * @param n             - количество итераций
 * @param f             - функция f(t, x, y)
 * @param rk4           - boolean, если true, будет вызвана функция с точностью 4
 * @returns [{x, y}]
 */
let rungeKuttaSecondOrder = (x0, y0, z0, h, n, rk4, f) => {
    let args = [x0, y0, z0, h, n, f];
    return rk4 ? rungeKutta4SecondOrder(...args) : rungeKutta2SecondOrder(...args);
}