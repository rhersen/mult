/*global describe,it,start,getPairs,checkAnswer,ui:true,mult,expect,spyOn,beforeEach*/

describe("mult", function () {
    describe("getPairs", function () {
        it("generates all pairs from (2,2) to (n,n)", function () {
            expect(getPairs(2).length).toEqual(1);
            expect(getPairs(3).length).toEqual(3);
            expect(getPairs(4).length).toEqual(6);
        });
    });

    describe("start", function () {
        beforeEach(function () {
            spyOn(ui, 'createTable');
            spyOn(ui, 'bindAnswer');
            spyOn(ui, 'updateQuestion');
        });

        it("should create table", function () {
            start(3, 'name');
            expect(ui.createTable).toHaveBeenCalledWith(3);
        });

        it("should set start time", function () {
            var before = new Date().getTime();
            start(3, 'name');
            var after = new Date().getTime();
            expect(before).not.toBeGreaterThan(mult.startMillis);
            expect(mult.startMillis).not.toBeGreaterThan(after);
        });

        it("binds answer", function () {
            start(3, 'name');
            expect(ui.bindAnswer).toHaveBeenCalled();
        });

        it("shows the first question", function () {
            start(3, 'name', [
                {x: 4, y: 4}
            ]);
            expect(ui.updateQuestion).toHaveBeenCalledWith({x: 4, y: 4});
        });
    });
});
