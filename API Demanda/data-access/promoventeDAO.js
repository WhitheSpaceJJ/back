const Promovente = require('../models/promovente')
const etniaDAO = require('../data-access/etniaDAO')
const escolaridadDAO = require('../data-access/escolaridadDAO')
const ocupacionDAO = require('../data-access/ocupacionDAO')
const familiarDAO = require('../data-access/familiarDAO')

class PromoventeDAO {
  /**
 * @abstract Método que permite crear un promovente en la base de datos
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearPromovente({id_promovente, español, id_escolaridad, id_etnia, id_ocupacion }) {
    try {
      const promovente = await Promovente.create({ id_promovente, español, id_escolaridad, id_etnia, id_ocupacion })
      return promovente
    } catch (err) {
      console.log(err.message)
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los promoventes de la base de datos
 * @returns {array} Retorna un arreglo de objetos de promoventes si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromoventes() {
    try {
      const promoventes = await Promovente.findAll(
        {
        }
      )
      const promoventes_obejct =  JSON.parse(JSON.stringify(promoventes))  
      for (let i = 0; i < promoventes_obejct.length; i++) {
        const etnia =  await etniaDAO.obtenerEtnia(promoventes_obejct[i].id_etnia)
        const escolaridad =  await escolaridadDAO.obtenerEscolaridadPorId(promoventes_obejct[i].id_escolaridad)
        const ocupacion =  await ocupacionDAO.obtenerOcupacion(promoventes_obejct[i].id_ocupacion)
        const familiares =  await familiarDAO.obtenerFamiliarPorPromovente(promoventes_obejct[i].id_promovente)
        delete promoventes_obejct[i].id_etnia
        delete promoventes_obejct[i].id_escolaridad
        delete promoventes_obejct[i].id_ocupacion    
        promoventes_obejct[i].etnia = etnia
        promoventes_obejct[i].escolaridad = escolaridad
        promoventes_obejct[i].ocupacion = ocupacion
        promoventes_obejct[i].familiares = familiares
      }
      return promoventes_obejct
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un promovente de la base de datos por su id
 * @param {number} id - ID del promovente a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromovente(id) {
    try {
      const promovente = await Promovente.findByPk(id)
      const promvente_obejct =  JSON.parse(JSON.stringify(promovente))  
      const etnia =  await etniaDAO.obtenerEtnia(promvente_obejct.id_etnia)
      const escolaridad =  await escolaridadDAO.obtenerEscolaridadPorId(promvente_obejct.id_escolaridad)
      const ocupacion =  await ocupacionDAO.obtenerOcupacion(promvente_obejct.id_ocupacion)
      const familiares =  await familiarDAO.obtenerFamiliarPorPromovente(promvente_obejct.id_promovente)
      delete promvente_obejct.id_etnia
      delete promvente_obejct.id_escolaridad
      delete promvente_obejct.id_ocupacion    
      promvente_obejct.etnia = etnia
      promvente_obejct.escolaridad = escolaridad
      promvente_obejct.ocupacion = ocupacion
      promvente_obejct.familiares = familiares
      return promvente_obejct
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un promovente de la base de datos por el id del participante
 * @param {number} idParticipante - ID del participante a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromoventePorParticipante(idParticipante) {
    try {
      const promovente = await Promovente.findOne({ where: { id_participante: idParticipante } })
      return promovente
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un promovente en la base de datos
 * @param {number} idParticipante - ID del participante a actualizar
 * @param {object} promovente - Objeto que contiene los nuevos datos del promovente
 * @returns {object} Retorna el objeto del promovente actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarPromovente(id_promovente_actualizar, { espanol, id_escolaridad, id_etnia, id_ocupacion }) {
    try {
      const promoventeActualizado = await Promovente.update({  espanol, id_escolaridad, id_etnia, id_ocupacion }, { where: { id_promovente: id_promovente_actualizar }  })
      return promoventeActualizado[0] ==1
    } catch (err) {      console.log(err.message)

      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un promovente de la base de datos
 * @param {number} idParticipante - ID del participante a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarPromovente(id_promovente) {
    try {
      const promovente = await Promovente.destroy({ where: { id_promovente: id_promovente } })
      return promovente == 1 
    } catch (err) {
      throw err
    }
  }
}

module.exports = new PromoventeDAO()
