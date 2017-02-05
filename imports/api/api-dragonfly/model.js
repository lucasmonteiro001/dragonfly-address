/**
 * Created by lucas on 2/4/17.
 */

export const DragonflyAddressModel = {
    "label": {
        label: 'Nome',
        type: 'text',
        id: 'label',
        required: true,
        col: 'col-xs-12',
        editPossible: true
    },
    "zipCode": {
        label: 'CEP',
        type: 'text',
        id: 'zipCode',
        title: 'CEP só pode conter números',
        col: 'col-xs-2',
        editPossible: false,
        dataMask: '00000-000',
        dataMaskOptions: {
            clearIfNotMatch: true,
            placeholder: '_____-___'
        }
    },
    "address": {
        label: 'Endereço',
        type: 'text',
        id: 'address',
        col: 'col-xs-5',
        editPossible: false
    },
    "number": {
        label: 'Número',
        type: 'text',
        id: 'number',
        col: 'col-xs-1',
        editPossible: false
    },
    "neighborhood": {
        label: 'Bairro',
        type: 'text',
        id: 'neighborhood',
        col: 'col-xs-2',
        editPossible: false
    },
    "complement":{
        label: 'Complemento',
        type: 'text',
        id: 'complement',
        col: 'col-xs-2',
        editPossible: false
    },
    "city": {
        label: 'Cidade',
        type: 'text',
        id: 'city',
        col: 'col-xs-5',
        editPossible: false
    },
    "state": {
        label: 'Estado',
        type: 'text',
        id: 'state',
        col: 'col-xs-3',
        editPossible: false
    },
    "country": {
        label: 'País',
        type: 'text',
        id: 'country',
        col: 'col-xs-4',
        required: true,
        editPossible: false
    }
};

/**
 * Returns an array of options taking from the Model
 * @param baseValues should be passed if the the should be filled with some values
 * @returns {Array}
 * @constructor
 */
export const DAMGetFormOptions = (baseValues) => {

    let options = [];

    for(prop in DragonflyAddressModel) {

        let opt = {...DragonflyAddressModel[prop]};

        if(baseValues) {
            opt.val = baseValues[prop];
        }

        options.push(opt);
    }

    return options;
};

/**
 * Search form the elements of the Model in the DOM and apply the masks
 * @constructor
 */
export const DAMApplyMasks = () => {

    // discover fields that must have mask
    let shouldHaveMask = Object.keys(DragonflyAddressModel).filter(key => !!DragonflyAddressModel[key].dataMask),
        willApplyMask = [];

    for(field of shouldHaveMask) {
        willApplyMask.push(DragonflyAddressModel[field]);
    }

    willApplyMask.map(element => {

        let options = {};

        // if exists options for the mask
        if(element.dataMaskOptions) {
            Object.assign(options, element.dataMaskOptions);
        }

        $('#' + element.id).mask(element.dataMask, options);
    });
};

/**
 * Get all values from the DOM
 * @param addressId of the address being saved
 * @returns {{}}
 * @constructor
 */
export const DAMGetFilledFormValues = (addressId) => {

    // get all form data
    let formData = {};

    for(prop in DragonflyAddressModel) {

        // get only editPossible values
        if(DragonflyAddressModel[prop].editPossible) {
            formData[prop] = $('#' + DragonflyAddressModel[prop].id).val();
        }
    }

    // add id to the form regarding the address beign edited
    formData.id = addressId;

    // TODO buscar dados automaticamente
    formData.availableItems = [];

    return formData;
};

Object.freeze(DragonflyAddressModel);