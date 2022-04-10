"use strict";

/*class FlagIcon extends HTMLElement {
  constructor() {
    super();
    this._countryCode = null;
  }

  static observedAttributes = ["country"];

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    this._countryCode = newValue;
    this._updateRendering();
    console.log(1111)
  }
  connectedCallback() {
    //this._updateRendering();
    console.log(22222)
  }

  get country() {
    return this._countryCode;
  }
  set country(v) {
    this.setAttribute("country", v);
  }

  _updateRendering() {
    console.log(this._countryCode)
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
  }
}*/
const _ajaxFileUploader = {
  openFileUploaderModal: function (config) {
    // trigger click button
    document.querySelector(`[data-target="#${this.timestamp}"]`).click();
    console.log(config)
  },
  timestamp: Date.now()
}

class AjaxFileUploader extends HTMLElement {
  constructor() {
    super();
  }

  static observedAttributes = ["trigger-function"];

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("name: " + name)
    console.log("old : " + oldValue)
    console.log("new : " + newValue)
    // if change trigger function
    if (typeof name != "undefined" && name == "trigger-function") this.initTriggerFunction(name, oldValue, newValue);

    // render 
    this.render();

    console.log("attributeChangedCallback")
    //console.log(newValue)
    //_ajaxFileUploader[newValue]("test")
  }
  connectedCallback() {
    this.initTriggerFunction("", "", "trigger");
    this.appendFileUploaderModalHTML();
    console.log("connectedCallback")
    this.render();
  }

  initTriggerFunction(name, oldValue, newValue) {
    // set default value
    newValue = newValue || "trigger";

    // set trigger function
    _ajaxFileUploader.trigger_function = newValue;

    // init trigger function
    _ajaxFileUploader[newValue] = new Function('return _ajaxFileUploader["openFileUploaderModal"](co);');

    // delete old trigger function
    if (typeof _ajaxFileUploader != "undefined" && typeof _ajaxFileUploader[oldValue] != "undefined") delete _ajaxFileUploader[oldValue];
  }

  appendFileUploaderModalHTML() {
    console.log(_ajaxFileUploader)
    let fileUploader = document.querySelector('ajax-file-uploader');
    fileUploader.innerHTML = `
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${_ajaxFileUploader.timestamp}" style="display: none;"></button>
    <div class="modal fade" id="${_ajaxFileUploader.timestamp}" tabindex="-1" role="dialog"
    aria-labelledby="${_ajaxFileUploader.timestamp}CenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <form method="post" action="#" id="#">
                    <div class="file-upload-wrapper">
                        <div class="file-upload card card-body view" style1="border: 1px solid red;">
                            <div class="file-upload-message">
                                <img src="https://img.icons8.com/ios/50/000000/upload-to-cloud--v1.png"/>
                                <p>Drop files here or Click to select</p>
                            </div>
                            <input type="file" class="input-files" multiple="">
                        </div>
                    </div>
                </form>
                <div serial="" class="file-container mt-2">
                    <div class="file-details">
                        <span class="align-top">Test.pdf</span>
                        <span class="float-right" style="cursor: pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </span>
                    </div>
                    <div class="mt-2 file-progress">
                        <span class="progress">
                            <span class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100"
                                aria-valuemin="0" aria-valuemax="100"></span>
                        </span>
                    </div>
                </div>
            </div>
            <span data-toggle="tooltip" data-placement="top" title="Tooltip on top">
            </span>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Upload</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>`;
    console.log(fileUploader)
  }


  test() {
    // set listeners
    ['drop', 'change'].forEach(evt =>
      //document.querySelector('.file_upload-select').addEventListener(evt, isDocumentApproved, false)
      console.log(evt)
    );
  }


  render() {
    console.log("render")
    console.log(_ajaxFileUploader)
    //document.querySelector(`[data-target="#ajax-file-uploader"]`).setAttribute('data-target', _ajaxFileUploader.timestamp)
    this.test()
  }
}
//function 
//customElements.define("flag-icon", FlagIcon);
customElements.define("ajax-file-uploader", AjaxFileUploader);