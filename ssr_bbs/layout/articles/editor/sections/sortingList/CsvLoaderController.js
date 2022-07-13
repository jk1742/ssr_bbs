import { LightPopupPanelController as Super } from "/layout/components/panel/lightPopupPanel/LightPopupPanelController";
import { FileInputController                } from '/layout/components/form/file/FileInputController';
import { FileInput                          } from '/layout/components/form/file/FileInput';

/***
 * layout:  CsvLoaderController control buttons
 ***/
const CsvLoaderController = function (_handler) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  CsvLoaderController.prototype = Object.create(Super.prototype);
  CsvLoaderController.prototype.constructor = CsvLoaderController;


  //* private variable ////////////////////////////////////////////////////////


  //* Access Control: getter & setter /////////////////////////////////////////


  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    adapt(_e, params) {
      if (fileInput.files.length <= 0) {
        fileInput.name = '*.csv';
        fileInput.label = 'please choose a csv file';
        ['is-white', 'is-light', 'is-dark', 'is-black', 'is-danger', 'is-info', 'is-success'].forEach(el => {
          if (fileInput.classList.contains(el)) fileInput.classList.replace(el, 'is-warning');
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        let lineSeparator = '\n';
        if (params.newLine !== 'newline' && typeof params.newLine !== 'undefined' && params.newLine.length > 0) lineSeparator = params.newLine;
        let columnSeparator = ',';
        if (typeof params.separator !== 'undefined' && params.separator.length > 0) columnSeparator = params.separator;
        const carriage = fileInput.csvToJSON(reader.result, lineSeparator, columnSeparator);
        if ('undefined' !== typeof _handler.onclick_transferData) _handler.onclick_transferData(_e, carriage);
      }
      reader.readAsBinaryString(fileInput.files[0]);
    },
    resetConditions(_e){
      fileInput.name = '*.csv';
      fileInput.label = 'please choose a csv file';
      ['is-white', 'is-light', 'is-dark', 'is-black', 'is-danger', 'is-warning', 'is-success'].forEach(el => {
        if (fileInput.classList.contains(el)) fileInput.classList.replace(el, 'is-info');
      });
      fileInput.initFile();
      if ('undefined' !== typeof _handler.onclick_resetFilter) _handler.onclick_resetConditions(_e);
    }
  });


  //* Lazy Initialization /////////////////////////////////////////////////////
  const file = new FileInput('is-small is-info').setIcon('fa-solid fa-eject').setLabel('Select a CSV File').setName('*.csv');
  const _dom = $SR.generateHtml`
  <div class="panel-block">
    <span class="panel-icon">
        <i class="fa-solid fa-angle-right" aria-hidden="true"></i>
    </span>
    <span> ${file.outerHTML} </span>
    <span style="margin-left:20px"></span>
  </div>
  `;
  const _LabelBlock = $SR.generateHtml`
  <a class="panel-block" data-class="label-block">
    <span class="panel-icon">
      <i class="fa-brands fa-trello" aria-hidden="true"></i>
    </span>
    <span> Column Separator </span>
    <span data-id="label-block-tag" style="margin-left:20px"></span>
  </a>
  `;
  const _ActionBlock = $SR.generateHtml`
  <div class="panel-block" data-class="action-block">
    <span style="width:50%;">Column Separator</span>
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="',' for column separator" data-id="action-block-input">
        <span class="icon is-left">
          <i class="fa-solid fa-gear" aria-hidden="true"></i>
        </span>
    </p>
    <a class="button is-primary is-inverted" data-id="action-block-select">
      <i class="fa-solid fa-check"></i>
    </a>
    <a class="button is-primary is-inverted" data-id="action-block-cancel">
      <i class="fa-solid fa-xmark"></i>
    </a>
  </div>
  `;

  //! keep sequence
  this.appendHeader('Csv File Loader');
  this.appendDataPanel(_dom);
  this.appendSimpleFilter('New Line', 'newLine', 'fa-solid fa-table-list', 'width:50%;', 'fa-solid fa-gear', '\'newline\' for new line separator');
  this.appendFilter('separator', _LabelBlock, _ActionBlock);
  this.appendFooterConfirm('confirm','cancel');

  let fileInput = this.getModelByDataClass('file-input')[0];
  fileInput = $SR.registerModel(fileInput).inject(FileInputController, {
    onchange_fileInput(_e) {
      const isSuccess = fileInput.extenderFilter(['csv']);
      if (!isSuccess) {
        fileInput.name = '*.csv';
        fileInput.label = 'please choose a csv file';
        ['is-white', 'is-light', 'is-dark', 'is-black', 'is-danger', 'is-info', 'is-success'].forEach(el => {
          if (fileInput.classList.contains(el)) fileInput.classList.replace(el, 'is-warning');
        });
        fileInput.initFile();
      } else {
        ['is-white', 'is-light', 'is-dark', 'is-black', 'is-danger', 'is-info', 'is-warning'].forEach(el => {
          if (fileInput.classList.contains(el)) fileInput.classList.replace(el, 'is-success');
        });
        fileInput.label = 'Loading success'
      }
    }
  });


  // //* End of Structure /////////////////////////////////////////////////////
  return this;
}

export {
  CsvLoaderController
}
