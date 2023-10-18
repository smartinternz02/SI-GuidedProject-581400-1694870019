document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("predict-form");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const rdSpend = parseFloat(document.getElementById("rd-spend").value);
        const adminSpend = parseFloat(document.getElementById("admin-spend").value);
        const marketingSpend = parseFloat(document.getElementById("marketing-spend").value);
        const state = document.getElementById("state").value;

        const data = new FormData();
        data.append('rd-spend', rdSpend);
        data.append('admin-spend', adminSpend);
        data.append('marketing-spend', marketingSpend);
        data.append('state', state);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const prediction = await response.text();
                resultDiv.innerHTML = prediction;
            } else {
                resultDiv.innerHTML = 'Error predicting profit';
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while predicting profit';
        }
    });
});
