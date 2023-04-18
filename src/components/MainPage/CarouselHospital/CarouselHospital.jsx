import { Carousel } from "react-bootstrap";
import ctImg from "./ct950.png";
import roomImg from "./room950.png";
import hallImg from "./hall950.png";

function CarouselHospital() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={hallImg} alt="First slide" />
        <Carousel.Caption>
          <h3>Un lugar innovador para su bienestar</h3>
          <p>
            Un espacio hospitalario que combina tecnología de última generación
            y diseño moderno para ofrecer una experiencia de atención médica
            excepcional y confortable
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={roomImg} alt="Second slide" />

        <Carousel.Caption>
          <h3>Cuidados de calidad</h3>
          <p>
            Brindando atención médica de calidad en un entorno cómodo y acogedor
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={ctImg} alt="Third slide" />

        <Carousel.Caption>
          <h3>Precision y confort en nuestras exploraciones médicas</h3>
          <p>
            La última tecnología en imágenes médicas para un diagnóstico preciso
            y confiable
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHospital;
