import {
    ASSET_INIT,
    ASSET_UPDATE,
} from '../actions/assetManagement';

const initAsset = {
    name: "SuperDA",
    addresses:[
        {
            address:"TSNbzxac4WhxN91XvaUfPTKP2jNT18mP6T",
            assets:[
                {
                    name:"!!!!GOLDCOIN",
                    id:1002341,
                    balance:20000
                },
                {
                    name:"!!!!GoldSpot!!!!",
                    id:1002467,
                    balance:3003423
                },
            ],
        },
        {
            address:"TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH",
            assets:[
                {
                    name:"!!!!GOLDCOIN",
                    id:1002341,
                    balance:20000
                },
                {
                    name:"!!!!GoldSpot!!!!",
                    id:1002467,
                    balance:3003423
                },
            ],
        },
    ],
    
}

export function assetManagementReducer(state = initAsset, action) {
    switch (action.type) {
        case ASSET_UPDATE:
            return action.payload;
        case ASSET_INIT:
            return initAsset;
        default:
            return state;
    }
}