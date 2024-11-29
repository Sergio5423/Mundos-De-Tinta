CREATE TABLE departamentos (
	id INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(40),
    funcion VARCHAR(40)
);

CREATE TABLE empleados (
	cedula VARCHAR(10) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    fechaNac DATE NOT NULL,
    direccion VARCHAR(40) NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    fk_departamentos_id INT,
    PRIMARY KEY (cedula),
    FOREIGN KEY (fk_departamentos_id) REFERENCES departamentos(id)
);

CREATE TABLE datosinicio (
	correo VARCHAR(40) NOT NULL,
    contraseña VARCHAR(20) NOT NULL,
    fk_empleados_cedula VARCHAR(10),
    PRIMARY KEY (correo),
    FOREIGN KEY (fk_empleados_cedula) REFERENCES empleados(cedula)
);

CREATE TABLE ventas (
	id INT NOT NULL,
    fecha DATE NOT NULL,
    fk_empleados_cedula VARCHAR(10),
    PRIMARY KEY (id),
    FOREIGN KEY (fk_empleados_cedula) REFERENCES empleados(cedula)
);

CREATE TABLE categorias (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    tipo VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE productos (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    fecha_entrada DATE NOT NULL,
    fk_ventas_id INT,
    fk_categorias_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_ventas_id) REFERENCES ventas(id),
    FOREIGN KEY (fk_categorias_id) REFERENCES categorias(id)
);