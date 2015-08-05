var $        = require('jquery');
var _        = require('underscore');
var stations = require('./stations.json').stations;

var $form = $('<td class="form-ia" id="ia-ok">' +
	'<form action="https://venta.renfe.com/vol/selecIndemAuto.do" method="post" target="_blank">' +
	'<input type="hidden" name="mascara" value="">' +
	'<input type="hidden" name="operation" value="">' +
	'<input type="hidden" name="currenLocation" value="">' +
	'<input type="hidden" name="descOrigen" value="">' +
	'<input type="hidden" name="descDestino" value="">' +
	'<input type="hidden" name="cdgoEstacionOrigen" value="">' +
	'<input type="hidden" name="cdgoEstacionDestino" value="">' +
	'<input type="hidden" name="cdgoAdmonOrigen" value="">' +
	'<input type="hidden" name="cdgoAdmonDestino" value="">' +
	'<input type="hidden" name="cdgoUicOrigen" value="">' +
	'<input type="hidden" name="cdgoUicDestino" value="">' +
	'<input type="hidden" name="pagRetorno" value="">' +
	'<input type="hidden" name="tipoConsulta" value="C">' +
	'<input type="hidden" name="cdgoBillete" value="">' +
	'<input type="hidden" name="ORIGEN" value="">' +
	'<input type="hidden" name="DESTINO" value="">' +
	'<input type="submit" value="Comprobar Indemnización Automática">' +
	'</form>' +
	'</td>');

$('#tablaDatos').find('tbody tr').each(function () {
	var $tr  = $(this);
	var code = $tr.find('.rightmenos60').html();
	$.get('https://venta.renfe.com/vol/consultaViaje.do?localizador=' + code, function (response) {
		var $resp        = $(response);
		var ticketNumber = $resp.find('.tablaPago > tbody > tr:nth-child(2) > td:nth-child(7)').html();
		if (ticketNumber != undefined) {

			ticketNumber = ticketNumber.replace(/&nbsp;/gi, '').trim();
			var o        = $resp.find('.datos_origen').html().trim();
			var d        = $resp.find('.datos_destino').html().trim();

			o = _.find(stations, function (station) {
				return station.d == o;
			});

			d = _.find(stations, function (station) {
				return station.d == d;
			});

			$form.find('[name=cdgoBillete]').val(ticketNumber);

			$form.find('[name=descOrigen]').val(o.d);
			$form.find('[name=cdgoEstacionOrigen]').val(o.cdgoEsta);
			$form.find('[name=cdgoAdmonOrigen]').val(o.admon);
			$form.find('[name=cdgoUicOrigen]').val(o.cdgoUic);
			$form.find('[name=ORIGEN]').val(o.d);

			$form.find('[name=descDestino]').val(d.d);
			$form.find('[name=cdgoEstacionDestino]').val(d.cdgoEsta);
			$form.find('[name=cdgoAdmonDestino]').val(d.admon);
			$form.find('[name=cdgoUicDestino]').val(d.cdgoUic);
			$form.find('[name=DESTINO]').val(d.d);

			$form.clone().appendTo($tr);
		} else {
			$tr.append('<td class="form-ia" id="ia-ko"><button disabled="disabled">No Disponible</button></td>')
		}
	});
});

