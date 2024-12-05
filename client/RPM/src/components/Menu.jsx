import { Link } from "react-router-dom";


const Menu = () => {


    return(
        <>
            <div className="link-menu">
                <Link to="/productForm" className="link"> Agregar Producto</Link>
                <Link to="/editProduct" className="link"> Editar o eliminar un producto</Link>
                <Link to="/register" className="link"> Crear usuario</Link>
           </div>
        </>
    )
}

export default Menu;