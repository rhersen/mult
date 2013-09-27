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

        it("creates table", function () {
            start(3, 'name');
            expect(ui.createTable).toHaveBeenCalledWith(3);
        });

        it("sets start time", function () {
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

    describe("checkAnswer", function () {
        beforeEach(function () {
            spyOn(ui, 'show');
            spyOn(ui, 'handleScore');
            spyOn(ui, 'updateQuestion');
            spyOn(ui, 'createTable');
        });

        it("should show if answer is correct", function () {
            start(3, 'name', [
                {x: 2, y: 3}
            ]);
            checkAnswer('6');
            expect(ui.show).toHaveBeenCalledWith(2, 3);
            expect(ui.show).toHaveBeenCalledWith(3, 2);
        });

        it("should not show if answer is wrong", function () {
            start(3, 'name', [
                {x: 2, y: 2}
            ]);
            checkAnswer('5');
            expect(ui.show).not.toHaveBeenCalled();
        });

        it("calls handleScore if answer is correct and there are no more questions", function () {
            start(3, 'name', [
                {x: 2, y: 2}
            ]);
            checkAnswer('4');
            expect(ui.handleScore).toHaveBeenCalled();
        });

        it("should not call handleScore if there are more questions", function () {
            start(3, 'name', [
                {x: 2, y: 2},
                {x: 3, y: 3}
            ]);
            checkAnswer('4');
            expect(ui.handleScore).not.toHaveBeenCalled();
        });

        it("should update question after getting correct answer", function () {
            start(3, 'name', [
                {x: 2, y: 2},
                {x: 3, y: 3}
            ]);
            checkAnswer('4');
            expect(ui.updateQuestion).toHaveBeenCalledWith({x: 3, y: 3});
        });
    });
});
