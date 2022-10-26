import React from "react";

const MainPage = () => {
  return (
    <>
      <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">Bienvenido</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Esta es la página principal del sistema de gestión hospitalaria del
            Hospital Alcázar
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
              Primary button
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">
              Secondary
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
