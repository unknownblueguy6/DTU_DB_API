const ARG_LOOKUP = {
    '-D' : 'DEBUG',
    '--debug' : 'DEBUG'
};

const ARGS = Object.keys(ARG_LOOKUP);

global.FLAGS = {
    'DEBUG' : false
};

function setFlags(args){
    args.forEach(arg => {
        if (ARGS.includes(arg)){
            FLAGS[ARG_LOOKUP[arg]] = true;
        }
    });
}

module.exports.setFlags = setFlags;