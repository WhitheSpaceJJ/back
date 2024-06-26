const Escolaridad = require('../models/escolaridad')

class EscolaridadDAO {
  /**
   * @abstract Método que permite crear una escolaridad en la base de datos
   * @param {object} descripcion - Objeto que contiene los datos de la escolaridad
   * @returns {object} Retorna el objeto de la escolaridad creada si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearEscolaridad({ descripcion,estatus_general }) {
    try {
      const escolaridad = await Escolaridad.create({ descripcion,estatus_general })
      return escolaridad
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener todas las escolaridades de la base de datos
   * @returns {array} Retorna un arreglo de objetos de escolaridades si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEscolaridades(activo) {
    try {
      if (activo !== undefined && activo !== null && activo !== "") {
        const escolaridades = await Escolaridad.findAll({ where: { estatus_general: "ACTIVO" } })
        return escolaridades
      } else{
        const escolaridades = await Escolaridad.findAll()
        return escolaridades
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener una escolaridad de la base de datos por su id
   * @param {number} id - ID de la escolaridad a obtener
   * @returns {object} Retorna el objeto de la escolaridad si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEscolaridadPorId(id) {
    try {
      const escolaridad = await Escolaridad.findByPk(id)
      return escolaridad
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite actualizar una escolaridad en la base de datos
   * @param {number} id_escolaridad - ID de la escolaridad a actualizar
   * @param {object} descripcion - Objeto que contiene los nuevos datos de la escolaridad
   * @returns {object} Retorna el objeto de la escolaridad actualizada si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarEscolaridad(id_escolaridad, { descripcion,estatus_general }) {
    try {
      const escolaridad = await Escolaridad.update({ descripcion,estatus_general }, { where: { id_escolaridad } })
      return escolaridad [0]==1
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite eliminar una escolaridad de la base de datos
   * @param {number} id - ID de la escolaridad a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarEscolaridad(id) {
    try {
      const escolaridad = await Escolaridad.destroy({ where: { id_escolaridad: id } })
      return escolaridad === 1
    } catch (err) {
      throw err
    }
  }
}

module.exports = new EscolaridadDAO()
