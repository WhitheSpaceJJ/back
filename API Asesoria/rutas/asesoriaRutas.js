
const express = require('express');
const servicioAsesorias = require('../servicios/servicioAsesorias');

const router = express.Router();
router.route('/paginacion')
.get(servicioAsesorias.obtenerAsesoriasPagina);

router.route('/paginacion-filtro')
.get(servicioAsesorias.obtenerAsesoriasPaginaFiltro);


router.route('/buscar')
  .get(servicioAsesorias.obtenerAsesoriaNombre);

  router.route('/total-asesorias')
  .get(servicioAsesorias.obtenerAsesoriaTotal);
  
  router.route('/total-asesorias-filtro').
  get(servicioAsesorias.obtenerAsesoriaFiltroTotal);

  router.route('/filtro')
  .get(servicioAsesorias.obtenerAsesoriaFiltro);

  router.route('/descargar-excel')
  .get(servicioAsesorias.obtenerAsesoriaFiltroExcel);


router.route('/')
  .get(servicioAsesorias.obtenerAsesorias)
  .post(servicioAsesorias.agregarAsesoria);

router.route('/:id')
  .get(servicioAsesorias.obtenerAsesoriaPorId)
  //.delete(servicioAsesorias.eliminarAsesoria)
  .put(servicioAsesorias.actualizarAsesoria)
  ;

module.exports = router;
 
