export class Bookmark {
    constructor(id = '', url = '', title = '', summary = '', tag = '', html = '') {
        this._url = url;
        this._title = title;
        this._summary = summary;
        this._tag = tag;
        this._html = html;
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get summary() {
        return this._summary;
    }

    set summary(value) {
        this._summary = value;
    }

    get tag() {
        return this._tag;
    }

    set tag(value) {
        this._tag = value;
    }

    get html() {
        return this._html;
    }

    set html(value) {
        this._html = value;
    }
}

export class Category {
    constructor(id, categoryName = '기본카테고리', bookmarkList = []) {
        this._id = id;
        this._categoryName = categoryName;
        this._bookmarkList = bookmarkList;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get categoryName() {
        return this._categoryName;
    }

    set categoryName(value) {
        this._categoryName = value;
    }

    get bookmarkList() {
        return this._bookmarkList;
    }

    set bookmarkList(value) {
        this._bookmarkList = value;
    }
}
