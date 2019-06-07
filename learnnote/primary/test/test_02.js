const context1 = {
    username: 'datamasterdo@gmail.com',
    password: 'datamasterdo!QAZ',
    proxy: 'http://40.125.208.119:8118',
};

const context2 = {
    username: 'William.liu@effem.com',
    password: 'datamasterdo!QAZ',
    proxy: 'http://40.125.208.119:8118',
};

const context_new = {
    username: 'pingping.chen@effem.com',
    password: 'datamasterdo!QAZ',
    proxy: 'http://40.125.208.119:8118',
};

const total_dict = {
    'arap_uk': ['arap_uk_login_cookie', 'https://arap.amazon.co.uk/dashboard/salesDiagnostic', context1],
    'arap_fr': ['arap_fr_login_cookie', 'https://arap.amazon.fr/dashboard/salesDiagnostic', context1],
    'arap_de': ['arap_de_login_cookie', 'https://arap.amazon.de/dashboard/salesDiagnostic', context2],
    'arap_us': ['arap_us_login_cookie', 'https://arap.amazon.com/dashboard/salesDiagnostic', context2],
    'ams_us': ['ams_us_login_cookie', 'https://advertising.amazon.com/home?entityId=ENTITY28F0NRNBO1JOX', context2],
    'ams_uk': ['ams_uk_login_cookie', 'https://advertising.amazon.co.uk/home?entityId=ENTITY16XQMOKRS1DYU', context_new],
    'ams_fr': ['ams_fr_login_cookie', 'https://advertising.amazon.fr/home?entityId=ENTITY2B1V8J980QMV9', context_new],
    'ams_de': ['ams_de_login_cookie', 'https://advertising.amazon.de/home?entityId=ENTITY1RIV9EOSQS9AP', context_new],
};

const arr = Object.getOwnPropertyNames(total_dict);

const out_key = process.argv[2];
const allow_input = Array.from(Object.getOwnPropertyNames(total_dict));

if (allow_input.indexOf(out_key) < 0){
    throw Error(`Input must be in [${allow_input.join(', ')}]`)
}