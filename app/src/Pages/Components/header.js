import '../CSS/HeaderStyle.css'
import Menu from './Menu_Principal';

function HeaderComponent() {
  return (
    <>
        <div className="logo"></div>
        <div className="nav">
          <Menu></Menu>
        </div>       
    </>
  );
}

export default HeaderComponent;