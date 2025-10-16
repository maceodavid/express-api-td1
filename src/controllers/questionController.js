export const getAllQuestions = (req, res) => {
    res.status(200).send([{
        id: "1",
        question: "Quelle est la capitale de la France ?",
        answer: "Paris"
    }]);
};

export const createQuestion = (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).send({
            error: "Question and answer are required"
        });
    }

    res.status(201).send({
        message: "Question created successfully"
    });
};

export const deleteQuestion = (req, res) => {
    const { id } = req.params;

    res.status(200).send({
        message: `Question ${id} deleted`
    });
};