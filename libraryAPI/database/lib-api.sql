-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `ISBN` varchar(255) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Harry Potter and The Sorcerer Stone','J.K. Rowling','Rowling Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(2,'Harry Potter and The Chamber Of Secrets','J.K. Rowling','Rowling Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(3,'Harry Potter and The Prisoner Of Azkaban','J.K. Rowling','Rowling Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(4,'Harry Potter and The Goblet Of Fire','J.K. Rowling','Rowling Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(5,'Death On The Nile','Agatha Christie','Heathrow Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(6,'The Isle of Beacon & The Mystery Behind It','Agatha Christie','Heathrow Publications','Fantasy','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(7,'Beyond Life','Ramon Sayer','Penguin Publications','Slice Of Life','ISBN1234SGHS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(8,'The Subtle Art Of Not Giving A F*ck','Mark Manson','Oracle Publications','Pyschology','ISBN2134HS789J',NULL,'2022-08-18 08:37:00','2022-08-18 08:37:00'),(9,'Inside Out','Ross Taylor','Rothschild Publications','Autobiography','ISBN323HS789J',NULL,'2022-08-18 08:37:00','2022-08-19 08:37:00'),(10,'Daring Greatly','Brene Brown','Penguin Publications','Motivation','ISBN768889J',NULL,'2022-08-18 08:37:00','2022-08-19 08:37:00'),(11,'Rich Dad Poor Dad','John Cho','Penguin Publications','Economics','ISBN089789J',NULL,'2022-08-18 08:37:00','2022-08-19 08:37:00');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `bookId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishes`
--

DROP TABLE IF EXISTS `publishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pubId` int DEFAULT NULL,
  `bookId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pubId` (`pubId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `publishes_ibfk_1` FOREIGN KEY (`pubId`) REFERENCES `pubs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `publishes_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishes`
--

LOCK TABLES `publishes` WRITE;
/*!40000 ALTER TABLE `publishes` DISABLE KEYS */;
/*!40000 ALTER TABLE `publishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pubs`
--

DROP TABLE IF EXISTS `pubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pubs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `PAN` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pubs`
--

LOCK TABLES `pubs` WRITE;
/*!40000 ALTER TABLE `pubs` DISABLE KEYS */;
INSERT INTO `pubs` VALUES (1,'Penguin Publications','Oxford, UK','PEN1OX','2022-08-18 08:37:00','2022-08-19 08:37:00'),(2,'Rothschild Publications','Birmingham, UK','ROT1BG','2022-08-18 08:37:00','2022-08-19 08:37:00'),(3,'Rowling Publications','Sussex, UK','ROW1SU','2022-08-18 08:37:00','2022-08-19 08:37:00'),(4,'Heathrow Publications','New York, US','HEA1NY','2022-08-18 08:37:00','2022-08-19 08:37:00');
/*!40000 ALTER TABLE `pubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bendict','strange','2022-08-18 08:37:00','2022-08-19 08:37:00'),(2,'Chris','capAm','2022-08-18 08:37:00','2022-08-19 08:37:00'),(3,'Leonardo','titanic','2022-08-18 08:37:00','2022-08-19 08:37:00'),(4,'Tom','forrest','2022-08-18 08:37:00','2022-08-19 08:37:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18  9:08:50
