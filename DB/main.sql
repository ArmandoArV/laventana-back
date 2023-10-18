-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema LaVentana
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LaVentana
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LaVentana` DEFAULT CHARACTER SET utf8 ;
USE `LaVentana` ;

-- -----------------------------------------------------
-- Table `LaVentana`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaVentana`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LaVentana`.`Location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaVentana`.`Location` (
  `idLocation` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  PRIMARY KEY (`idLocation`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LaVentana`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaVentana`.`Category` (
  `idCategory` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `LaVentana`.`Location_has_Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LaVentana`.`Location_has_Category` (
  `Location_idLocation` INT NOT NULL,
  `Category_idCategory` INT NOT NULL,
  `idLocationCategory` INT NOT NULL,
  PRIMARY KEY (`Location_idLocation`, `Category_idCategory`, `idLocationCategory`),
  INDEX `fk_Location_has_Category_Category1_idx` (`Category_idCategory` ASC) VISIBLE,
  INDEX `fk_Location_has_Category_Location_idx` (`Location_idLocation` ASC) VISIBLE,
  CONSTRAINT `fk_Location_has_Category_Location`
    FOREIGN KEY (`Location_idLocation`)
    REFERENCES `LaVentana`.`Location` (`idLocation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Location_has_Category_Category1`
    FOREIGN KEY (`Category_idCategory`)
    REFERENCES `LaVentana`.`Category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
