import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import DataTable from "react-data-table-component";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarController, BarElement, PieController, ArcElement } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFilePdf } from "react-icons/fa";
import "../../design/Administrador.css";
import logo from "../../design/Logo.png";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, PieController, ArcElement);

let Ingresos;

const Administrador = () => {
    const [selectedSection, setSelectedSection] = useState("Empleados");
    const [empleados, setEmpleados] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [masvendidos, setMasvendidos] = useState([]);

    const getEmpleados = async () => {
        const allEmpleados = await fetch("http://localhost:3000/empleados");
        const empleadosJson = await allEmpleados.json();
        setEmpleados(empleadosJson.data);
    };

    const getVentas = async () => {
        const allVentas = await fetch("http://localhost:3000/ventas");
        const ventasJson = await allVentas.json();
        setVentas(ventasJson.data);
    };

    const getPagos = async () => {
        const allPagos = await fetch("http://localhost:3000/ventas/pagos");
        const pagosJson = await allPagos.json();
        setPagos(pagosJson.data);
    };

    const getMasVendidos = async () => {
        const allMasVendidos = await fetch("http://localhost:3000/ventas/MasVendidos");
        const MasVendidosJson = await allMasVendidos.json();
        setMasvendidos(MasVendidosJson.data);
        console.log(MasVendidosJson);        
    };

    const getIngresos = async () => {
        const ingresos = await fetch("http://localhost:3000/ventas/ingresos");
        const ingresosJson = await ingresos.json();
        Ingresos = ingresosJson.data[0].Ingresos;
    };

    const data = {
        labels: masvendidos.map((item) => item.ProductoNombre),
        datasets: [
            {
                data: masvendidos.map((item) => item.cantidad),
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        getEmpleados();
        getVentas();
        getIngresos();
        getPagos();
        getMasVendidos();
    }, []);

    const sections = [
        { label: "Tabla de Empleados", key: "Empleados" },
        { label: "Tabla de Productos Más Vendidos", key: "ProductosMasVendidos" },
        { label: "Tabla de Ventas", key: "Ventas" },
        { label: "Tabla de Pagos", key: "Pagos" },
        { label: "Gráfico de Ventas", key: "GraficoVentas" },
        { label: "Gráfico de Ventas (Torta)", key: "GraficoTorta" },
    ];

    const renderSection = () => {
        switch (selectedSection) {
            case "Empleados":
                return <DataTable columns={columnsEmpleados} data={empleados} pagination paginationPerPage={10} />;
            case "ProductosMasVendidos":
                return (
                    <>
                        <DataTable columns={columnsMasVendidos} data={masvendidos} pagination paginationPerPage={10} />
                        <p>Ingresos Totales: ${Ingresos}</p>
                    </>
                );
            case "Ventas":
                return <DataTable columns={columnsVentas} data={ventas} pagination paginationPerPage={10} />;
            case "Pagos":
                return <DataTable columns={columnsPagos} data={pagos} pagination paginationPerPage={10} />;
            case "GraficoVentas":
                return <Bar data={data} options={options} />;
                case "GraficoTorta":
                    return (
                        <div id="GraficoTorta" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ minHeight: '200px', display: 'block', width: '80%' }}>
                                <Pie data={data} options={options} className="pie-chart" />
                            </div>
                            <div style={{ width: '20%', paddingLeft: '20px' }}>
                                <Typography variant="h6" gutterBottom>Sección del Gráfico</Typography>
                                {data.labels.map((label, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <div
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: data.datasets[0].backgroundColor[index],
                                                marginRight: '10px',
                                            }}
                                        />
                                        <Typography variant="body1">{label}</Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
        
            default:
                return null;
        }
    };

    const columnsEmpleados = [
        { name: "Cedula", selector: (row) => row.cedula },
        { name: "Nombre", selector: (row) => row.nombre },
        { name: "Fecha de Nacimiento", selector: (row) => row.fechaNac },
        { name: "Direccion", selector: (row) => row.direccion },
        { name: "Telefono", selector: (row) => row.telefono },
        { name: "Departamento", selector: (row) => row.Departamento },
    ];

    const columnsVentas = [
        { name: "Id", selector: (row) => row.id },
        { name: "Fecha", selector: (row) => row.fecha },
        { name: "Cedula Empleado", selector: (row) => row.cedula },
        { name: "Nombre Empleado", selector: (row) => row.nombreEmpleado },
        { name: "Nombre Producto", selector: (row) => row.nombreProducto },
        { name: "Precio Unitario", selector: (row) => row.precio_unitario },
    ];

    const columnsMasVendidos = [
        { name: "ID", selector: (row) => row.ID },
        { name: "Nombre del Producto", selector: (row) => row.ProductoNombre },
        { name: "Veces Vendido", selector: (row) => row.cantidad },
    ];

    const columnsPagos = [
        { name: "Cedula", selector: (row) => row.cedula },
        { name: "Nombre", selector: (row) => row.nombreEmpleado },
        { name: "Pago", selector: (row) => row.Pago },
    ];

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("ESTADÍSTICAS MUNDOS DE TINTA", 20, 20);

        html2canvas(document.querySelector("#pdfContent"), { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            doc.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);
            doc.save("Informe_Estadisticas_MundosDeTinta.pdf");
        });
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 170,
                        boxSizing: "border-box",
                        padding: "15px",
                        marginTop: "1px", 
                    },
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: "120px",
                        height: "auto",
                        marginBottom: "20px",
                        display: "block",
                        margin: "0 auto",
                    }}
                />
                <List>
                    {sections.map((section) => (
                        <ListItem button key={section.key} onClick={() => setSelectedSection(section.key)}>
                            <ListItemText primary={section.label} />
                        </ListItem>
                    ))}
                </List>
                <ListItem button onClick={generatePDF}>
                    <FaFilePdf /> Generar Informe PDF
                </ListItem>
            </Drawer>
            <div
                style={{
                    marginLeft: 60,
                    padding: "16px",
                    width: "100%",
                    overflowX: "auto",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    height: "100vh",
                }}
            >
                <MenuSuperiorAdministrador />
                <div
                    style={{
                        marginTop: "100px", 
                        width: "100%",
                        paddingBottom: "20px",
                    }}
                    id="pdfContent"
                >
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default Administrador;