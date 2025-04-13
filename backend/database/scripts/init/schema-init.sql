USE  `splitwise`;

DROP TABLE IF EXISTS `EnumCurrency`;

CREATE TABLE `EnumCurrency` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `currencyName` VARCHAR(45) NULL,
  `currencySymbol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `currencySymbol_UNIQUE` (`currencySymbol` ASC) VISIBLE,
  UNIQUE INDEX `currencyName_UNIQUE` (`currencyName` ASC) VISIBLE);