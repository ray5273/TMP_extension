
export class Bookmark {
    constructor(id='', url= '', title= '', summary='', tag='', html = '') {
        this._url = url;
        this._title = title;
        this._summary = summary;
        this._tag = tag;
        this._html = html;
        this._id = id;
    }

    set id(value) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    get url() {
        return this._url;
    }

    get title() {
        return this._title;
    }

    get summary() {
        return this._summary;
    }

    get tag() {
        return this._tag;
    }

    get html() {
        return this._html;
    }

    set url(value) {
        this._url = value;
    }

    set title(value) {
        this._title = value;
    }

    set summary(value) {
        this._summary = value;
    }

    set tag(value) {
        this._tag = value;
    }

    set html(value) {
        this._html = value;
    }
}

export class Category {
    constructor(id, categoryName ='기본카테고리', bookmarkList = []) {
        this._id = id;
        this._categoryName = categoryName;
        this._bookmarkList = bookmarkList;
    }

    get id() {
        return this._id;
    }

    get categoryName() {
        return this._categoryName;
    }

    get bookmarkList() {
        return this._bookmarkList;
    }

    set id(value) {
        this._id = value;
    }

    set categoryName(value) {
        this._categoryName = value;
    }

    set bookmarkList(value) {
        this._bookmarkList = value;
    }
}
