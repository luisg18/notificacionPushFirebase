
    const newMsg = [1,2,3,4,5,6,7,8,9];
    const objeto = {
        message:'hola',
        title: 'Luis',
        bici: 'aparentemente bien',
        mano: 'esguinzada'
    }

const miFuncion = (obj) => {
    return obj.mano;
}

export const FirstApp = () =>{
    return (
      <>
      <h1>Hola mundó</h1>
      La mano est&aacute; &nbsp;
        {/* <code> { JSON.stringify(objeto) } </code> */
            miFuncion(objeto)
        }
        <p>Soy un subtítulo</p>
      </>
    );
  }