CREATE TABLE `rectangles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `width` smallint(3) unsigned NOT NULL,
  `height` smallint(3) unsigned NOT NULL,
  `color` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;