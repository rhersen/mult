/*global describe,it,start,getPairs,ui:true,mult,expect*/

describe("getPairs", function () {
    it("generates all pairs from (2,2) to (n,n)", function () {
        expect(getPairs(2).length).toEqual(1);
        expect(getPairs(3).length).toEqual(3);
        expect(getPairs(4).length).toEqual(6);
    });
});

describe("start", function () {
    var nop = function () {
    };

    var tableCreated;
    var pair;

    ui = {
        createTable: function () {
            tableCreated = true;
        },
        bindAnswer: nop,
        updateQuestion: function (p) {
            pair = p;
        }
    };

    it("should create table", function () {
        start(3, 'name');
        expect(tableCreated).toBe(true);
    });

    it("should update question", function () {
        start(3, 'name');
        expect(pair.x).toBeLessThan(4);
        expect(pair.y).toBeLessThan(4);
        expect(pair.x).toBeGreaterThan(1);
        expect(pair.y).toBeGreaterThan(1);
    });

    it("should set start time", function () {
        var before = new Date().getTime();
        start(3, 'name');
        var after = new Date().getTime();
        expect(before).not.toBeGreaterThan(mult.startMillis);
        expect(mult.startMillis).not.toBeGreaterThan(after);
    });
});
