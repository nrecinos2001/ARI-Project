import styles from './header.module.css';

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleDiv}>
        <span className={styles.text}>&nbsp;ARI-Proyecto&nbsp;</span>
        <span className={styles.hoverText}>&nbsp;ARI-Proyecto&nbsp;</span>
      </div>
      <p>
        Una de las principales funciones de un profesional de la informática, enfocado a la gestión de los
        activos de la seguridad de la información, es la de garantizar métodos seguros de intercambio de
        datos, tanto a nivel de usuarios como entre API’s. Es así que, con el objetivo que se exploren y
        utilicen protocolos estándares de intercambio y comunicación entre aplicaciones en la web, se
        solicita la siguiente pieza de software.
      </p>
      <p>El software posee las siguientes funcionalidades:</p>
      <ul>
        <li>Genera y permite guardar un JSON a partir de un archivo de texto, donde los datos en el archivo de texto están separados por delimitadores.</li>
        <li>Cifra el dato del número de tarjeta de crédito en la generación de JSON.</li>
        <li>Maneja los datos geográficos siguiendo estándar OGC.</li>
        <li>Genera y permite guardar un archivo de texto a partir de un archivo JSON.</li>
        <li>Las conversiones y cifrado se realizan a través de una API que atiende un servicio web.</li>
      </ul>
    </div>
  );
}
