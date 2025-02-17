import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {useNavigate, useParams} from "react-router-dom";

const LandingPage = () => {
	const [carouselData, setCarouselData] = useState([]);
	const [eventData, setEventData] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Simulación de llamada al API
	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			const simulatedCarouselData = [
				{
					image: "https://i.ibb.co/9hd2wZF/Whats-App-Image-2024-12-18-at-4-32-30-PM.jpg",
					date: "Abril 26 - 27",
					title: "Rave 2025",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://cdn.vor.us/images/frontpage/2024/10/movement.jpg",
					date: "May 24 - 26",
					title: "Movement Music Festival",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://cdn.vor.us/images/frontpage/2024/12/gasparilla.jpg",
					date: "Feb 14 - 16",
					title: "Gasparilla Music Festival",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
			];

			const simulatedEventData = [
				{
					image: "https://via.placeholder.com/250x150",
					title: "Great American Music Hall",
					date: "Feb 14 - 16",
					location: "San Francisco, CA",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "The Rebel Lounge",
					date: "Feb 14 - 16",
					location: "Phoenix, AZ",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Troubadour",
					date: "Feb 14 - 16",
					location: "West Hollywood, CA",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Higher Ground",
					date: "Feb 14 - 16",
					location: "S. Burlington, VT",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Rave 2025",
					date: "Feb 14 - 16",
					location: "Los Angeles, Chile",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Club W party",
					date: "Feb 14 - 16",
					location: "Los Angeles, Chile",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Foret",
					date: "Feb 14 - 16",
					location: "Concepcion, Chile",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
				{
					image: "https://via.placeholder.com/250x150",
					title: "Feria Laboral",
					date: "Feb 14 - 16",
					location: "Santiago, Chile",
					link: "https://demo.hi.events/event/1/dog-conf-2030",
				},
			];

			setCarouselData(simulatedCarouselData);
			setEventData(simulatedEventData);
			setFilteredEvents(simulatedEventData); // Inicialmente muestra todos los eventos
			setLoading(false);
		}, 2000);
	}, []);

	// Manejo de la búsqueda
	const handleSearch = () => {
		const lowerCaseQuery = searchQuery.toLowerCase();

		// Si el campo de búsqueda está vacío, muestra todos los eventos
		if (!lowerCaseQuery) {
			setFilteredEvents(eventData);
			return;
		}

		// Filtra los eventos según el texto ingresado
		const results = eventData.filter(
			(event) =>
				event.title.toLowerCase().includes(lowerCaseQuery) ||
				event.location.toLowerCase().includes(lowerCaseQuery)
		);
		setFilteredEvents(results);
	};

	if (loading) {
		return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;
	}

	return (
		<div style={{ fontFamily: "Arial, sans-serif" }}>
			{/* Header */}
			<header
				style={{

					padding: "1rem",
					borderBottom: "1px solid #ccc",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					  
				}}
			>
				<img
					src="https://i.ibb.co/yFWZzfV/logo-Negro.png" // Cambia esto por la URL de tu imagen
					alt="GoPass cl"
					style={{ height: "40px" }} // Ajusta el tamaño de la imagen según sea necesario
				/>
				<div>
					<button
						style={{
							marginRight: "1rem",
							padding: "0.5rem 1rem",
							border: "none",
							borderRadius: "4px",
							backgroundColor: "#FF6F61",
							color: "white",
							cursor: "pointer",
						}}
						onClick={() => navigate('/auth/login')} // Cambia "/login" a la ruta deseada
					>
						Accede/Registrate
					</button>
					<button
						style={{
							padding: "0.5rem 1rem",
							border: "none",
							borderRadius: "4px",
							backgroundColor: "#FF6F61",
							color: "white",
							cursor: "pointer",
						}}
					>
						Soporte
					</button>
				</div>
			</header>

			{/* Banner */}
			<section
				style={{
					marginTop: "1rem",
					width: "87%",
					margin: "0 auto",
					borderRadius: "12px",
					overflow: "hidden",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				<Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
					{carouselData.map((item, index) => (
						<div
							key={index}
							style={{ position: "relative", height: "400px", cursor: "pointer" }}
							onClick={() => window.open(item.link,"_blank")} // Cambia la URL por la deseada
						>
							<img
								src={item.image}
								alt={item.title}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
							<div
								style={{
									position: "absolute",
									bottom: "10%",
									left: "5%",
									backgroundColor: "rgba(0, 0, 0, 0.5)",
									padding: "1rem",
									borderRadius: "8px",
									color: "white",
								}}
							>
								<h3 style={{ fontSize: "18px", margin: 0 }}>{item.date}</h3>
								<h2 style={{ fontSize: "28px", margin: "5px 0 0 0" }}>{item.title}</h2>
							</div>
						</div>
					))}
				</Carousel>


			</section>

			{/* Search Bar */}
			<section style={{ margin: "2rem 0", textAlign: "center" }}>
				<input
					type="text"
					placeholder="Busca tus ticket por evento, talento, organizador, lugar"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					style={{
						width: "80%",
						padding: "0.5rem",
						borderRadius: "4px",
						border: "1px solid #ccc",
						backgroundColor: "transparent",
					}}
				/>
				<button
					onClick={handleSearch}
					style={{
						padding: "0.5rem 1rem",
						marginLeft: "1rem",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#FF6F61",
						color: "white",
						cursor: "pointer",
					}}
				>
					Buscar
				</button>
			</section>

			{/* Events Grid */}
			<section style={{ padding: "2rem" }}>
				<h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Proximos Eventos</h2>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "1.5rem",
						justifyContent: "center",
					}}
				>
					{filteredEvents.map((event, index) => (
						<div
						key={index}
						style={{
							width: "250px",
							border: "1px solid #ccc",
							borderRadius: "8px",
							overflow: "hidden",
							boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
						}}
					>
						<a
							href={event.link}
							target="_blank"
							rel="noopener noreferrer"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<img src={event.image} alt={event.title} style={{ width: "100%" }} />
							<div style={{ padding: "1rem" }}>
								<h3 style={{ margin: "0 0 0.5rem 0" }}>{event.title}</h3>
								<p style={{ margin: 0, color: "#666" }}>{event.location}</p>
							</div>
						</a>
					</div>
					
					))}
				</div>
			</section>
		</div>
	);
};

export default LandingPage;