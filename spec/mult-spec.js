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

    ui = {
        createTable: function () {
            tableCreated = true;
        },
        bindAnswer: nop,
        updateQuestion: nop
    };

    it("should create table", function () {
        start(3, 'name');
        expect(tableCreated).toBe(true);
    });
});
