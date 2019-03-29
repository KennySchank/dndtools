-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2018 at 07:45 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dnd`
--

-- --------------------------------------------------------

--
-- Table structure for table `armor`
--

CREATE TABLE `armor` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Cost` int(10) NOT NULL,
  `AC_Bonus` varchar(40) NOT NULL,
  `Strength` int(2) DEFAULT NULL,
  `Stealth` varchar(12) DEFAULT NULL,
  `Weight` decimal(6,2) NOT NULL,
  `Type` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `armor`
--

INSERT INTO `armor` (`ID`, `Name`, `Cost`, `AC_Bonus`, `Strength`, `Stealth`, `Weight`, `Type`) VALUES
(1, 'Padded', 5, '11 + Dex modifier', NULL, 'Disadvantage', '8.00', 'light'),
(2, 'Leather', 10, '11 + Dex modifier', NULL, NULL, '10.00', 'light'),
(3, 'Studded leather', 45, '12 + Dex modifier', NULL, NULL, '13.00', 'light'),
(4, 'Hide', 10, '12 + Dex modifier (max 2)', NULL, NULL, '12.00', 'medium'),
(5, 'Chain shirt', 50, '13 + Dex modifier (max 2)', NULL, NULL, '20.00', 'medium'),
(6, 'Scale mail', 50, '14 + Dex modifier (max 2)', NULL, 'Disadvantage', '45.00', 'medium'),
(7, 'Breastplate', 400, '14 + Dex modifier (max 2)', NULL, NULL, '20.00', 'medium'),
(8, 'Half plate', 750, '15 + Dex modifier (max 2)', NULL, 'Disadvantage', '40.00', 'medium'),
(9, 'Ring mail', 30, '14', NULL, 'Disadvantage', '40.00', 'heavy'),
(10, 'Chain mail', 75, '16', 0, 'Disadvantage', '55.00', 'heavy'),
(11, 'Splint', 200, '17', 0, 'Disadvantage', '60.00', 'heavy'),
(12, 'Plate', 1500, '18', 0, 'Disadvantage', '65.00', 'heavy'),
(13, 'Shield', 10, '2', NULL, NULL, '6.00', 'shield');

-- --------------------------------------------------------

--
-- Table structure for table `gear`
--

CREATE TABLE `gear` (
  `ID` int(5) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Cost` int(10) NOT NULL,
  `Weight` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gear`
--

INSERT INTO `gear` (`ID`, `Name`, `Cost`, `Weight`) VALUES
(1, 'Abacus', 200, '2.00'),
(2, 'Acid (vial)', 2500, '1.00'),
(3, 'Alchemist\'s fire (flask)', 5000, '1.00'),
(4, 'Amulet (holy symbol)', 500, '1.00'),
(5, 'Animal Feed (per day)', 5, '10.00'),
(6, 'Antitoxin (vial)', 5000, '0.00'),
(7, 'Arrows (20)', 100, '1.00'),
(8, 'Backpack', 200, '5.00'),
(9, 'Bagpipes', 3000, '6.00'),
(10, 'Ball bearings (bag of 1,000)', 100, '2.00'),
(11, 'Barrel', 200, '70.00'),
(12, 'Basket', 40, '2.00'),
(13, 'Bedroll', 100, '7.00'),
(14, 'Bell', 100, '0.00'),
(15, 'Bit and bridle', 200, '1.00'),
(16, 'Blanket', 50, '3.00'),
(17, 'Block and tackle', 100, '5.00'),
(18, 'Blowgun Needles (50)', 100, '1.00'),
(19, 'Book', 2500, '5.00'),
(20, 'Bottle, glass', 200, '2.00'),
(21, 'Bucket', 5, '2.00'),
(22, 'Caltrops (bag of 20)', 100, '2.00'),
(23, 'Candle', 1, '0.00'),
(24, 'Case, crossbow bolt', 100, '1.00'),
(25, 'Case, map or scroll', 100, '1.00'),
(26, 'Chain (10 feet)', 500, '10.00'),
(27, 'Chalk (1 piece)', 1, '0.00'),
(28, 'Chest', 500, '25.00'),
(29, 'Clothes, Common', 50, '3.00'),
(30, 'Clothes, costume', 500, '4.00'),
(31, 'Clothes, fine', 1500, '6.00'),
(32, 'Clothes, traveler\'s', 200, '4.00'),
(33, 'Component pouch', 2500, '2.00'),
(34, 'Crossbow bolts (20)', 100, '1.50'),
(35, 'Crowbar', 200, '5.00'),
(36, 'Crystal (arcane focus)', 1000, '1.00'),
(37, 'Dice Set', 10, '0.00'),
(38, 'Drum', 600, '3.00'),
(39, 'Dulcimer', 2500, '10.00'),
(40, 'Emblem (holy symbol)', 500, '0.00'),
(41, 'Fishing tackle', 100, '4.00'),
(42, 'Flask or Tankard', 2, '1.00'),
(43, 'Flute', 200, '1.00'),
(44, 'Grappling hook', 200, '4.00'),
(45, 'Hammer', 100, '3.00'),
(46, 'Hammer, sledge', 200, '10.00'),
(47, 'Holy Water (flask)', 2500, '1.00'),
(48, 'Horn', 300, '2.00'),
(49, 'Hourglass', 2500, '1.00'),
(50, 'Hunting trap', 500, '25.00'),
(51, 'Ink (1 ounce bottle)', 1000, '0.00'),
(52, 'Ink pen', 2, '0.00'),
(53, 'Jug or Pitcher', 2, '4.00'),
(54, 'Kit, climber\'s', 2500, '12.00'),
(55, 'Kit, disguise', 2500, '3.00'),
(56, 'Kit, forgery', 1500, '5.00'),
(57, 'Kit, healer\'s', 500, '3.00'),
(58, 'Kit, herbalism', 500, '3.00'),
(59, 'Kit, mess', 20, '1.00'),
(60, 'Kit, poisoner\'s', 5000, '2.00'),
(61, 'Ladder (10-foot)', 10, '25.00'),
(62, 'Lamp', 50, '1.00'),
(63, 'Lantern, bullseye', 1000, '2.00'),
(64, 'Lantern, hooded', 500, '2.00'),
(65, 'Lock', 1000, '1.00'),
(66, 'Lute', 3500, '2.00'),
(67, 'Lyre', 3000, '2.00'),
(68, 'Magnifying glass', 10000, '0.00'),
(69, 'Manacles', 200, '6.00'),
(70, 'Mirror, steel', 500, '0.50'),
(71, 'Oil (flask)', 10, '1.00'),
(72, 'Orb (arcane focus)', 2000, '3.00'),
(73, 'Pan flute', 1200, '2.00'),
(74, 'Paper (one sheet)', 20, '0.00'),
(75, 'Parchment (one sheet)', 10, '0.00'),
(76, 'Perfume (vial)', 500, '0.00'),
(77, 'Pick, miner\'s', 200, '10.00'),
(78, 'Piton', 5, '0.25'),
(79, 'Playing Card Set', 50, '0.00'),
(80, 'Poison, basic (vial)', 10000, '0.00'),
(81, 'Pole (10-foot)', 5, '7.00'),
(82, 'Pot, iron', 200, '10.00'),
(83, 'Potion of Healing', 5000, '0.50'),
(84, 'Pouch', 50, '1.00'),
(85, 'Quiver', 100, '1.00'),
(86, 'Ram, portable', 400, '35.00'),
(87, 'Rations (1 day)', 50, '2.00'),
(88, 'Reliquary (holy symbol)', 500, '2.00'),
(89, 'Robes', 100, '4.00'),
(90, 'Rod (arcane focus)', 1000, '2.00'),
(91, 'Rope, hempen (50 feet)', 100, '10.00'),
(92, 'Rope, silk (50 feet)', 1000, '5.00'),
(93, 'Sack', 1, '0.50'),
(94, 'Saddle, Exotic', 6000, '40.00'),
(95, 'Saddle, Military', 2000, '30.00'),
(96, 'Saddle, Pack', 500, '15.00'),
(97, 'Saddle, Riding', 1000, '25.00'),
(98, 'Saddlebags', 400, '8.00'),
(99, 'Scale, merchant\'s', 500, '3.00'),
(100, 'Sealing wax', 50, '0.00'),
(101, 'Shawm', 200, '1.00'),
(102, 'Shovel', 200, '5.00'),
(103, 'Signal whistle', 5, '0.00'),
(104, 'Signet ring', 500, '0.00'),
(105, 'Sling bullets (20)', 4, '1.50'),
(106, 'Soap', 2, '0.00'),
(107, 'Spellbook', 5000, '3.00'),
(108, 'Spikes, iron (10)', 100, '5.00'),
(109, 'Sprig of mistletoe (druidic focus)', 100, '0.00'),
(110, 'Spyglass', 100000, '1.00'),
(111, 'Staff (arcane focus)', 500, '4.00'),
(112, 'Supplies, alchemist\'s', 5000, '8.00'),
(113, 'Supplies, brewer\'s', 2000, '9.00'),
(114, 'Supplies, calligrapher\'s', 1000, '5.00'),
(115, 'Supplies, painter\'s', 1000, '5.00'),
(116, 'Tent, two-person', 200, '20.00'),
(117, 'Tinderbox', 50, '1.00'),
(118, 'Tools, carpenter\'s', 800, '6.00'),
(119, 'Tools, cartographer\'s', 1500, '6.00'),
(120, 'Tools, cobbler\'s', 500, '5.00'),
(121, 'Tools, glassblower\'s', 3000, '5.00'),
(122, 'Tools, jeweler\'s', 2500, '2.00'),
(123, 'Tools, leatherworker\'s', 500, '5.00'),
(124, 'Tools, mason\'s', 1000, '8.00'),
(125, 'Tools, navigator\'s', 2500, '2.00'),
(126, 'Tools, potter\'s', 1000, '3.00'),
(127, 'Tools, smith\'s', 2000, '8.00'),
(128, 'Tools, thieves\'', 2500, '1.00'),
(129, 'Tools, tinker\'s', 5000, '10.00'),
(130, 'Tools, weaver\'s', 100, '5.00'),
(131, 'Tools, woodcarver\'s', 100, '5.00'),
(132, 'Torch', 1, '1.00'),
(133, 'Totem (druidic focus)', 100, '0.00'),
(134, 'Utensils, cook\'s', 100, '8.00'),
(135, 'Vial', 100, '0.00'),
(136, 'Viol', 3000, '1.00'),
(137, 'Wand (arcane focus)', 1000, '1.00'),
(138, 'Waterskin', 20, '5.00'),
(139, 'Whetstone', 1, '1.00'),
(140, 'Wooden staff (druidic focus)', 500, '4.00'),
(141, 'Yew wand (druidic focus)', 1000, '1.00');

-- --------------------------------------------------------

--
-- Table structure for table `mounts_vehicles`
--

CREATE TABLE `mounts_vehicles` (
  `ID` int(5) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Cost` int(7) NOT NULL,
  `Coin` varchar(2) NOT NULL,
  `Speed` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mounts_vehicles`
--

INSERT INTO `mounts_vehicles` (`ID`, `Name`, `Cost`, `Coin`, `Speed`) VALUES
(1, 'Camel', 50, 'gp', '50 ft.'),
(2, 'Donkey or mule', 8, 'gp', '40 ft.'),
(3, 'Elephant', 200, 'gp', '40 ft.'),
(4, 'Horse,draft', 50, 'gp', '40 ft.'),
(5, 'Horse,riding', 75, 'gp', '60 ft.'),
(6, 'Mastiff', 25, 'gp', '40 ft.'),
(7, 'Pony', 30, 'gp', '40 ft.'),
(8, 'Warhorse', 400, 'gp', '60 ft.'),
(9, 'Carriage', 100, 'gp', NULL),
(10, 'Cart', 15, 'gp', NULL),
(11, 'Chariot', 250, 'gp', NULL),
(12, 'Sled', 20, 'gp', NULL),
(13, 'Wagon', 35, 'gp', NULL),
(14, 'Galley', 30000, 'gp', '4 mph'),
(15, 'Keelboat', 3000, 'gp', '1 mph'),
(16, 'Longship', 10000, 'gp', '3 mph'),
(17, 'Rowboat', 50, 'gp', '1.5 mph'),
(18, 'Sailing ship', 10000, 'gp', '2 mph'),
(19, 'Warship', 25000, 'gp', '2.5 mph');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Race` varchar(50) NOT NULL,
  `Class` varchar(50) NOT NULL,
  `Level` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`ID`, `Name`, `Race`, `Class`, `Level`) VALUES
(1, 'Eldyn Stealthfoot', 'Elf, wood', 'Ranger', 15),
(2, 'Astor Redcloak', 'Half-elf', 'Sorcerer', 2),
(3, 'Lythea Goldfinger', 'Halfling, lightfoot', 'Rogue', 7),
(4, 'Crumo the Purger', 'Dwarf, hill', 'Cleric', 10),
(5, 'Dornu Longclaw', 'Elf, wood', 'Druid', 3),
(6, 'Tordu', 'Human', 'Monk', 1),
(7, 'Dramos', 'Tiefling', 'Warlock', 8),
(8, 'Draskor the White', 'Dragonborn', 'Paladin', 6),
(9, 'Grandorg', 'Dwarf, mountain', 'Fighter', 4),
(10, 'Xaladin Grayheart', 'Elf, high', 'Wizard', 14),
(11, 'Torgg', 'Half-orc', 'Barbarian', 9),
(12, 'Trimbleton', 'Gnome, forest', 'Bard', 11);

-- --------------------------------------------------------

--
-- Table structure for table `owner_armor`
--

CREATE TABLE `owner_armor` (
  `owner_armor_id` int(5) NOT NULL,
  `owner_id` int(5) NOT NULL,
  `armor_id` int(5) NOT NULL,
  `Quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owner_armor`
--

INSERT INTO `owner_armor` (`owner_armor_id`, `owner_id`, `armor_id`, `Quantity`) VALUES
(1, 1, 13, 1),
(2, 1, 3, 1),
(3, 3, 2, 1),
(4, 3, 3, 1),
(5, 4, 7, 1),
(6, 4, 12, 1),
(7, 4, 13, 1),
(8, 5, 4, 1),
(9, 5, 13, 1),
(10, 7, 3, 1),
(11, 8, 12, 1),
(12, 8, 13, 1),
(13, 9, 11, 1),
(14, 11, 5, 1),
(15, 12, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `owner_gear`
--

CREATE TABLE `owner_gear` (
  `owner_gear_id` int(5) NOT NULL,
  `owner_id` int(5) NOT NULL,
  `gear_id` int(5) NOT NULL,
  `Quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owner_gear`
--

INSERT INTO `owner_gear` (`owner_gear_id`, `owner_id`, `gear_id`, `Quantity`) VALUES
(1, 1, 6, 1),
(2, 1, 7, 1),
(3, 1, 8, 1),
(4, 1, 13, 1),
(5, 1, 16, 1),
(6, 1, 32, 1),
(7, 1, 33, 1),
(8, 1, 50, 3),
(9, 1, 58, 1),
(10, 1, 73, 1),
(11, 1, 85, 1),
(12, 1, 87, 5),
(13, 1, 91, 1),
(14, 1, 117, 1),
(15, 1, 132, 3),
(16, 1, 138, 1),
(17, 2, 8, 1),
(18, 2, 13, 1),
(19, 2, 16, 1),
(20, 2, 31, 1),
(21, 2, 36, 1),
(22, 2, 87, 5),
(23, 2, 89, 1),
(24, 2, 91, 1),
(25, 2, 117, 1),
(26, 2, 132, 3),
(27, 2, 138, 1),
(28, 3, 8, 1),
(29, 3, 10, 1),
(30, 3, 13, 1),
(31, 3, 16, 1),
(32, 3, 24, 1),
(33, 3, 32, 1),
(34, 3, 34, 1),
(35, 3, 35, 1),
(36, 3, 44, 1),
(37, 3, 55, 1),
(38, 3, 56, 1),
(39, 3, 60, 1),
(40, 3, 79, 1),
(41, 3, 84, 2),
(42, 3, 87, 5),
(43, 3, 91, 1),
(44, 3, 93, 5),
(45, 3, 117, 1),
(46, 3, 128, 1),
(47, 3, 132, 3),
(48, 3, 138, 1),
(49, 4, 4, 1),
(50, 4, 6, 1),
(51, 4, 8, 1),
(52, 4, 13, 1),
(53, 4, 16, 1),
(54, 4, 31, 1),
(55, 4, 47, 3),
(56, 4, 57, 1),
(57, 4, 83, 6),
(58, 4, 87, 5),
(59, 4, 92, 1),
(60, 4, 99, 1),
(61, 4, 115, 1),
(62, 4, 117, 1),
(63, 4, 132, 3),
(64, 4, 138, 1),
(65, 5, 8, 1),
(66, 5, 13, 1),
(67, 5, 16, 1),
(68, 5, 29, 1),
(69, 5, 48, 1),
(70, 5, 87, 5),
(71, 5, 91, 1),
(72, 5, 117, 1),
(73, 5, 132, 3),
(74, 5, 138, 1),
(75, 5, 141, 1),
(76, 6, 8, 1),
(77, 6, 13, 1),
(78, 6, 16, 1),
(79, 6, 29, 1),
(80, 6, 32, 1),
(81, 6, 58, 1),
(82, 6, 87, 5),
(83, 6, 91, 1),
(84, 6, 117, 1),
(85, 6, 126, 1),
(86, 6, 132, 3),
(87, 6, 138, 1),
(88, 7, 3, 3),
(89, 7, 8, 1),
(90, 7, 13, 1),
(91, 7, 16, 1),
(92, 7, 19, 1),
(93, 7, 24, 1),
(94, 7, 31, 1),
(95, 7, 34, 1),
(96, 7, 60, 1),
(97, 7, 87, 5),
(98, 7, 91, 1),
(99, 7, 107, 1),
(100, 7, 117, 1),
(101, 7, 132, 3),
(102, 7, 138, 1),
(103, 8, 5, 5),
(104, 8, 8, 1),
(105, 8, 13, 1),
(106, 8, 15, 1),
(107, 8, 16, 1),
(108, 8, 32, 1),
(109, 8, 40, 1),
(110, 8, 57, 1),
(111, 8, 87, 5),
(112, 8, 91, 1),
(113, 8, 95, 1),
(114, 8, 98, 1),
(115, 8, 117, 1),
(116, 8, 132, 3),
(117, 8, 138, 1),
(118, 9, 7, 1),
(119, 9, 8, 1),
(120, 9, 13, 1),
(121, 9, 16, 1),
(122, 9, 32, 1),
(123, 9, 85, 1),
(124, 9, 87, 5),
(125, 9, 91, 1),
(126, 9, 116, 1),
(127, 9, 117, 1),
(128, 9, 132, 3),
(129, 9, 138, 1),
(130, 9, 139, 1),
(131, 10, 1, 1),
(132, 10, 8, 1),
(133, 10, 13, 1),
(134, 10, 16, 1),
(135, 10, 32, 1),
(136, 10, 49, 1),
(137, 10, 87, 5),
(138, 10, 91, 1),
(139, 10, 107, 1),
(140, 10, 111, 1),
(141, 10, 112, 1),
(142, 10, 117, 1),
(143, 10, 132, 3),
(144, 10, 138, 1),
(145, 11, 8, 1),
(146, 11, 13, 1),
(147, 11, 16, 1),
(148, 11, 18, 1),
(149, 11, 29, 1),
(150, 11, 50, 1),
(151, 11, 58, 1),
(152, 11, 84, 1),
(153, 11, 84, 1),
(154, 11, 87, 5),
(155, 11, 91, 1),
(156, 11, 117, 1),
(157, 11, 132, 3),
(158, 11, 138, 1),
(159, 12, 1, 1),
(160, 12, 8, 1),
(161, 12, 13, 1),
(162, 12, 16, 1),
(163, 12, 17, 1),
(164, 12, 22, 1),
(165, 12, 24, 1),
(166, 12, 25, 1),
(167, 12, 32, 1),
(168, 12, 34, 1),
(169, 12, 35, 1),
(170, 12, 43, 1),
(171, 12, 44, 1),
(172, 12, 56, 1),
(173, 12, 66, 1),
(174, 12, 84, 2),
(175, 12, 84, 1),
(176, 12, 87, 5),
(177, 12, 91, 1),
(178, 12, 99, 1),
(179, 12, 117, 1),
(180, 12, 129, 1),
(181, 12, 132, 3),
(182, 12, 136, 1),
(183, 12, 138, 1);

-- --------------------------------------------------------

--
-- Table structure for table `owner_weapons`
--

CREATE TABLE `owner_weapons` (
  `owner_weapon_id` int(5) NOT NULL,
  `owner_id` int(5) NOT NULL,
  `weapon_id` int(5) NOT NULL,
  `Quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owner_weapons`
--

INSERT INTO `owner_weapons` (`owner_weapon_id`, `owner_id`, `weapon_id`, `Quantity`) VALUES
(1, 1, 36, 1),
(2, 1, 13, 1),
(3, 1, 26, 1),
(4, 1, 2, 2),
(5, 2, 2, 2),
(6, 2, 11, 1),
(7, 3, 2, 2),
(8, 3, 28, 2),
(9, 3, 34, 2),
(10, 4, 7, 1),
(11, 4, 5, 4),
(12, 5, 10, 1),
(13, 5, 9, 1),
(14, 5, 5, 2),
(15, 6, 8, 1),
(16, 7, 28, 1),
(17, 7, 35, 1),
(18, 8, 19, 1),
(19, 8, 18, 1),
(20, 8, 31, 1),
(21, 8, 21, 1),
(22, 8, 6, 4),
(23, 9, 22, 1),
(24, 9, 20, 1),
(25, 9, 36, 1),
(26, 10, 8, 1),
(27, 11, 19, 1),
(28, 11, 35, 1),
(29, 12, 32, 1),
(30, 12, 26, 2),
(31, 12, 2, 2),
(32, 12, 34, 1),
(33, 12, 37, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(5) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Name`, `Type`) VALUES
(1, 'garygygax', 'gary123', 'Mr. Gygax', 'admin'),
(2, 'barrybones', 'barry123', 'Barry Bones', 'gm'),
(3, 'billybones', 'billy123', 'Billy Bones', 'player');

-- --------------------------------------------------------

--
-- Table structure for table `user_owners`
--

CREATE TABLE `user_owners` (
  `user_owner_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `owner_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_owners`
--

INSERT INTO `user_owners` (`user_owner_id`, `user_id`, `owner_id`) VALUES
(3, 3, 1),
(4, 3, 4),
(5, 3, 8),
(6, 3, 12);

-- --------------------------------------------------------

--
-- Table structure for table `weapons`
--

CREATE TABLE `weapons` (
  `ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Cost` int(10) NOT NULL,
  `Damage` varchar(6) DEFAULT NULL,
  `Type` varchar(20) DEFAULT NULL,
  `Weight` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `weapons`
--

INSERT INTO `weapons` (`ID`, `Name`, `Cost`, `Damage`, `Type`, `Weight`) VALUES
(1, 'Club', 10, '1d4', 'bludgeoning', '2.00'),
(2, 'Dagger', 200, '1d4', 'piercing', '1.00'),
(3, 'Greatclub', 20, '1d8', 'bludgeoning', '10.00'),
(4, 'Handaxe', 500, '1d6', 'slashing', '2.00'),
(5, 'Javelin', 50, '1d6', 'piercing', '2.00'),
(6, 'Light Hammer', 200, '1d4', 'bludgeoning', '2.00'),
(7, 'Mace', 500, '1d6', 'bludgeoning', '4.00'),
(8, 'Quarterstaff', 20, '1d6', 'bludgeoning', '4.00'),
(9, 'Sickle', 100, '1d4', 'slashing', '2.00'),
(10, 'Spear', 100, '1d6', 'piercing', '3.00'),
(11, 'Crossbow, light', 2500, '1d8', 'piercing', '5.00'),
(12, 'Dart', 5, '1d4', 'piercing', '0.25'),
(13, 'Shortbow', 2500, '1d6', 'piercing', '2.00'),
(14, 'Sling', 10, '1d4', 'bludgeoning', '0.00'),
(15, 'Battleaxe', 1000, '1d8', 'slashing', '4.00'),
(16, 'Flail', 1000, '1d8', 'bludgeoning', '2.00'),
(17, 'Glaive', 2000, '1d10', 'slashing', '6.00'),
(18, 'Greataxe', 3000, '1d12', 'slashing', '7.00'),
(19, 'Greatsword', 5000, '2d6', 'slashing', '6.00'),
(20, 'Halberd', 2000, '1d10', 'slashing', '6.00'),
(21, 'Lance', 1000, '1d12', 'piercing', '6.00'),
(22, 'Longsword', 1500, '1d8', 'slashing', '3.00'),
(23, 'Maul', 1000, '2d6', 'bludgeoning', '10.00'),
(24, 'Morningstar', 1500, '1d8', 'piercing', '4.00'),
(25, 'Pike', 500, '1d10', 'piercing', '18.00'),
(26, 'Rapier', 2500, '1d8', 'piercing', '2.00'),
(27, 'Scimitar', 2500, '1d6', 'slashing', '3.00'),
(28, 'Shortsword', 1000, '1d6', 'piercing', '2.00'),
(29, 'Trident', 500, '1d6', 'piercing', '4.00'),
(30, 'War Pick', 500, '1d8', 'piercing', '2.00'),
(31, 'Warhammer', 1500, '1d8', 'bludgeoning', '2.00'),
(32, 'Whip', 200, '1d4', 'slashing', '3.00'),
(33, 'Blowgun', 1000, '1', 'piercing', '1.00'),
(34, 'Crossbow, hand', 7500, '1d6', 'piercing', '3.00'),
(35, 'Crossbow, heavy', 5000, '1d10', 'piercing', '18.00'),
(36, 'Longbow', 5000, '1d8', 'piercing', '2.00'),
(37, 'Net', 100, NULL, NULL, '3.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `armor`
--
ALTER TABLE `armor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gear`
--
ALTER TABLE `gear`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `mounts_vehicles`
--
ALTER TABLE `mounts_vehicles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `owner_armor`
--
ALTER TABLE `owner_armor`
  ADD PRIMARY KEY (`owner_armor_id`);

--
-- Indexes for table `owner_gear`
--
ALTER TABLE `owner_gear`
  ADD PRIMARY KEY (`owner_gear_id`);

--
-- Indexes for table `owner_weapons`
--
ALTER TABLE `owner_weapons`
  ADD PRIMARY KEY (`owner_weapon_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_owners`
--
ALTER TABLE `user_owners`
  ADD PRIMARY KEY (`user_owner_id`);

--
-- Indexes for table `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `armor`
--
ALTER TABLE `armor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `gear`
--
ALTER TABLE `gear`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `mounts_vehicles`
--
ALTER TABLE `mounts_vehicles`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `owner_armor`
--
ALTER TABLE `owner_armor`
  MODIFY `owner_armor_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `owner_gear`
--
ALTER TABLE `owner_gear`
  MODIFY `owner_gear_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT for table `owner_weapons`
--
ALTER TABLE `owner_weapons`
  MODIFY `owner_weapon_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_owners`
--
ALTER TABLE `user_owners`
  MODIFY `user_owner_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `weapons`
--
ALTER TABLE `weapons`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
