import React from 'react'

export default function Carousel({ img1, img2, img3 }) {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators mb-0">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators mb-0" >
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2500">
                        <img src={img1} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={img2} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={img3} className="d-block w-100" alt="..." style={{ height: "13vmax", borderRadius: "20px", }} />
                    </div>
                </div>
              
            </div> */}

        </div>
    )
}
