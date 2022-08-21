const STRAGE_KEY_CLIENTS = 'clients';
const STRAGE_KEY_RECEIVABLES = 'receivables';
const STRAGE_KEY_PRODUCTS = 'products';
const STRAGE_KEY_INCOME = 'income';
const STRAGE_KEY_CART = 'cart';

const DEFAULT_CLIENTS = [
    {'id':1, 'code':'9999', 'name':'一般のお客様', 'kanaName':''},
    {'id':2, 'code':'1111', 'name':'山田春子', 'kanaName':'やまだはるこ'},
    {'id':3, 'code':'2222', 'name':'田中夏彦', 'kanaName':'たなかなつひこ'},
    {'id':4, 'code':'3333', 'name':'佐藤秋子', 'kanaName':'さとうあきこ'},
    {'id':5, 'code':'4444', 'name':'鈴木冬彦', 'kanaName':'すずきふゆひこ'},
    {'id':6, 'code':'5555', 'name':'山本一郎', 'kanaName':'やまもといちろう'}
];
const DEFAULT_RECEIVABLES = [
    {'id':1, 'client_id':3, 'amount':15000, 'date':'2022-7-21', 'received_date':null, 'category':'内装', 'detail':'詳細'},
    {'id':2, 'client_id':2, 'amount':20000, 'date':'2022-8-3', 'received_date':null, 'category':'太陽光発電', 'detail':'詳細'},
    {'id':3, 'client_id':2, 'amount':30000, 'date':'2022-8-10', 'received_date':null, 'category':'太陽光発電', 'detail':'詳細'},
    {'id':4, 'client_id':2, 'amount':5000, 'date':'2022-8-16', 'received_date':null, 'category':'ガス', 'detail':'詳細'},
];
const DEFAULT_PRODUCTS = [
    {'id':1, 'code':'111111', 'name':'愛媛のおいしいお米 5kg', 'maker': '松山JA', 'category':'食品', 'price':2000},
    {'id':2, 'code':'222222', 'name':'ミネラルウォーター 1L', 'maker': 'イオン', 'category':'飲料', 'price':150},
];
const DEFAULT_INCOME = [
    {'id':1, 'date':'2022-8-1', 'client_id':'9999', 'amount':2000, 'type':'products', 'item_id':1, 'category': '食品', 'detail': '愛媛のおいしいお米 5kg'},
];
const DEFAULT_CART = [ 
    //{'id':1, 'date':'2022-8-1', 'client_id':'9999', 'amount':2000, 'type':'products', 'item_id':1, 'category': '食品', 'detail': '愛媛のおいしいお米 5kg', 'quantity':1},
];

/*
function mytest() {
    console.log('mytest');
}
*/

function ini_strage() {
    var clients = [];
    var receivables = [];
    var products = [];
    var income = [];
    var cart = [];

    if (localStorage.getItem(STRAGE_KEY_CLIENTS)) {
        try {
            clients = JSON.parse(localStorage.getItem(STRAGE_KEY_CLIENTS));
        } catch(e) {
            localStorage.removeItem(STRAGE_KEY_CLIENTS);
        }
    }
    if ( !clients.length ) {
        clients = DEFAULT_CLIENTS;
        save_clients(clients);
    }
    
    if (localStorage.getItem(STRAGE_KEY_RECEIVABLES)) {
        try {
            receivables = JSON.parse(localStorage.getItem(STRAGE_KEY_RECEIVABLES));
        } catch(e) {
            localStorage.removeItem(STRAGE_KEY_RECEIVABLES);
        }
    }
    if ( !receivables.length ) {
        receivables = DEFAULT_RECEIVABLES;
        save_receivables(receivables);
    }

    if (localStorage.getItem(STRAGE_KEY_PRODUCTS)) {
        try {
            products = JSON.parse(localStorage.getItem(STRAGE_KEY_PRODUCTS));
        } catch(e) {
            localStorage.removeItem(STRAGE_KEY_PRODUCTS);
        }
    }
    if ( !products.length ) {
        products = DEFAULT_PRODUCTS;
        save_products(products);
    }    

    if (localStorage.getItem(STRAGE_KEY_INCOME)) {
        try {
            income = JSON.parse(localStorage.getItem(STRAGE_KEY_INCOME));
        } catch(e) {
            localStorage.removeItem(STRAGE_KEY_INCOME);
        }
    }
    if ( !income.length ) {
        income = DEFAULT_INCOME;
        save_income(income);
    }        

    if (localStorage.getItem(STRAGE_KEY_CART)) {
        try {
            cart = JSON.parse(localStorage.getItem(STRAGE_KEY_CART));
        } catch(e) {
            localStorage.removeItem(STRAGE_KEY_CART);
        }
    }
    if ( !cart.length ) {
        cart = DEFAULT_CART;
        save_cart(cart);
    }            

    console.log('ini_strage');
    return {'clients':clients, 'receivables':receivables, 'products':products, 'income':income, 'cart':cart};
}

// used only in index.html 
function delete_strage() {
    try {
        localStorage.setItem(STRAGE_KEY_CLIENTS, '');
        localStorage.removeItem(STRAGE_KEY_CLIENTS);
        localStorage.setItem(STRAGE_KEY_RECEIVABLES, '');
        localStorage.removeItem(STRAGE_KEY_RECEIVABLES);
        localStorage.setItem(STRAGE_KEY_PRODUCTS, '');
        localStorage.removeItem(STRAGE_KEY_PRODUCTS);
        localStorage.setItem(STRAGE_KEY_INCOME, '');
        localStorage.removeItem(STRAGE_KEY_INCOME);
        localStorage.setItem(STRAGE_KEY_CART, '');
        localStorage.removeItem(STRAGE_KEY_CART);
    } catch(e) {
        console.log('error in delete_strage()');
    }
}

function save_clients(clients) {
    localStorage.setItem(STRAGE_KEY_CLIENTS, JSON.stringify(clients));
}

function save_receivables(receivables) {
    localStorage.setItem(STRAGE_KEY_RECEIVABLES, JSON.stringify(receivables));
}

function save_products(products) {
    localStorage.setItem(STRAGE_KEY_PRODUCTS, JSON.stringify(products));
}

function save_income(income) {
    localStorage.setItem(STRAGE_KEY_INCOME, JSON.stringify(income));
}

function save_cart(cart) {
    localStorage.setItem(STRAGE_KEY_CART, JSON.stringify(cart));
}



