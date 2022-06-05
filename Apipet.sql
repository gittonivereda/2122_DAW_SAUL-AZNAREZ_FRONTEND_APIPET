-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 05, 2022 at 10:46 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Apipet`
--

-- --------------------------------------------------------

--
-- Table structure for table `animal`
--

CREATE TABLE `animal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `raza` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `edad` int(11) NOT NULL,
  `provincia` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `localidad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tamanio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `animal`
--

INSERT INTO `animal` (`id`, `nombre`, `tipo`, `raza`, `edad`, `provincia`, `localidad`, `tamanio`, `descripcion`, `user_id`) VALUES
(42, 'Pedro', 'Perro', 'Rotwailer', 3, 'Valencia', 'Ribarroja del turia', 'Grande', 'Soy un perro muy bueno y me encanta cuidar la casa.', 33),
(43, 'Tobi', 'Perro', 'Boxer', 1, 'Valencia', 'Valencia', 'Grande', 'Soy un gran perro aunque un poco travieso.', 37),
(44, 'Gatiti', 'Gato', 'Persa', 4, 'Valencia', 'Valencia', 'Normal', 'Soy un gato muy jugueton.', 37),
(45, 'Copito', 'Gato', 'Persa', 1, 'Zaragoza', 'Zaragoza', 'Pequeño', 'Soy un bebe que quiere jugar mucho.', 38),
(46, 'Ceni', 'Perro', 'Pitbull', 1, 'Zaragoza', 'Zaragoza', 'Normal', 'Soy un cachorro un poco travieso y jugueton.', 38),
(47, 'Blanquito', 'Perro', 'Bullterrier', 5, 'Zaragoza', 'Zaragoza', 'Normal', 'Soy un perro muy tranquilo y bueno.', 38),
(49, 'Parlante', 'Pajaro', 'Cacatua', 7, 'Zaragoza', 'Zaragoza', 'Normal', 'Me encanta hablar mucho.', 38),
(50, 'Lorito', 'Pajaro', 'Loro', 9, 'Zaragoza', 'Zaragoza', 'Normal', 'Me encanta cantar.', 38),
(51, 'Gato', 'Gato', 'Comun', 6, 'Zaragoza', 'Zaragoza', 'Pequeño', 'Me gusta ir a mi marcha.', 38),
(52, 'Mia', 'Gato', 'Comun', 4, 'Zaragoza', 'Zaragoza', 'Pequeño', 'Soy muy mimosa.', 38);

-- --------------------------------------------------------

--
-- Table structure for table `animal_user`
--

CREATE TABLE `animal_user` (
  `animal_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `animal_user`
--

INSERT INTO `animal_user` (`animal_id`, `user_id`) VALUES
(42, 38);

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `imagen` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `animal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `imagenes`
--

INSERT INTO `imagenes` (`id`, `imagen`, `animal_id`) VALUES
(3, 'rottweiler.jpg', 42),
(4, 'rottweiler1.jpg', 42),
(5, 'boxer.webp', 43),
(6, 'boxer1.jpg', 43),
(7, 'gatoPersa.webp', 44),
(8, 'gatoPersa1.jpeg', 44),
(9, 'gatoPersaBebe.jpg', 45),
(10, 'gatoPersaBebe1.jpeg', 45),
(11, 'gatoPersaBebe2.webp', 45),
(12, 'pitbull.jpg', 46),
(13, 'pitbull1.jpg', 46),
(14, 'pitbull2.jpeg', 46),
(15, 'bullterrier.jpg', 47),
(16, 'bullterrier1.jpg', 47),
(18, 'cacatua.jpg', 49),
(19, 'cacatua1.webp', 49),
(20, 'loro.jpg', 50),
(21, 'loro1.jpg', 50),
(22, 'gatoComun.jpg', 51),
(23, 'gatoComun1.jpg', 51),
(24, 'gatoComun3.webp', 52),
(25, 'gatoComun4.jpg', 52);

-- --------------------------------------------------------

--
-- Table structure for table `intereses`
--

CREATE TABLE `intereses` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provincia` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `intereses`
--

INSERT INTO `intereses` (`id`, `tipo`, `provincia`, `user_id`) VALUES
(9, 'Perro', 'Valencia', 33);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `imagen` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `nombre`, `apellidos`, `ciudad`, `telefono`, `imagen`, `edad`) VALUES
(33, 'saul@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Saul', 'Aznarez', 'Zaragoza', 123456789, 'perfil1.png', 31),
(34, 'rosa@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Rosa', 'Martinez', 'Valencia', 987654321, 'perfil5.png', 30),
(35, 'pepe@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Pepe', 'Esteban', 'Albacete', 123456789, 'perfil2.png', 22),
(36, 'pepita@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Pepita', 'Lazaro', 'Alicante', 123456789, 'perfil2.png', 28),
(37, 'pv@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Protectora', 'Valencia', 'Valencia', 123456789, 'perfil6.png', 30),
(38, 'pz@prueba.es', 'ROLE_USER', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'Protectora ', 'Animales', 'Zaragoza', 987654321, 'perfil8.png', 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animal_user`
--
ALTER TABLE `animal_user`
  ADD PRIMARY KEY (`animal_id`,`user_id`),
  ADD KEY `IDX_CABE977D8E962C16` (`animal_id`),
  ADD KEY `IDX_CABE977DA76ED395` (`user_id`);

--
-- Indexes for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_376A60018E962C16` (`animal_id`);

--
-- Indexes for table `intereses`
--
ALTER TABLE `intereses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_9B6D26FAA76ED395` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animal`
--
ALTER TABLE `animal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `intereses`
--
ALTER TABLE `intereses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animal_user`
--
ALTER TABLE `animal_user`
  ADD CONSTRAINT `FK_CABE977D8E962C16` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_CABE977DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `FK_376A60018E962C16` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`);

--
-- Constraints for table `intereses`
--
ALTER TABLE `intereses`
  ADD CONSTRAINT `FK_9B6D26FAA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
