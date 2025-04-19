function checkSelectedSymptoms() {
    const select = document.getElementById("symptomsSelect");
    const resultDiv = document.getElementById("result");

    // Get selected symptoms
    const selectedSymptoms = Array.from(select.selectedOptions).map(option => option.value);

    // Symptom-to-condition mapping
    const symptomsMap = {
        fever: "You may have a viral or bacterial infection. Consider consulting a doctor.",
        headache: "This could be due to stress, dehydration, or migraines. Stay hydrated and rest.",
        cough: "It might be a common cold, allergies, or a respiratory infection.",
        sore_throat: "You could have a throat infection or irritation. Warm fluids may help.",
        fatigue: "This may be caused by lack of sleep, stress, or anemia. Rest and proper nutrition are important.",
        nausea: "You might have indigestion, food poisoning, or motion sickness. Stay hydrated.",
        stomach_pain: "Could indicate indigestion, gastritis, or appendicitis (if severe). Seek medical advice if persistent.",
        diarrhea: "This might be caused by food poisoning, infection, or IBS. Stay hydrated and avoid heavy meals.",
        cold: "You might have a common cold or mild viral infection. Rest and fluids are key.",
        rash: "This could be due to an allergy, skin irritation, or infection. Avoid scratching and monitor it.",
        dizziness: "It could be caused by dehydration, low blood pressure, or anemia.",
        chest_pain: "This could be a serious issue like a heart problem or indigestion. Consult a doctor immediately.",
        back_pain: "May be due to poor posture, strain, or a slipped disc. Rest and gentle stretching may help."
    };

    // Match selected symptoms with conditions
    const matchedConditions = selectedSymptoms.map(
        symptom => `<strong>${symptom}</strong>: ${symptomsMap[symptom]}`
    );

    // Display results
    if (matchedConditions.length > 0) {
        resultDiv.innerHTML = `
            <h2>Possible Conditions:</h2>
            <ul>
                ${matchedConditions.map(condition => `<li>${condition}</li>`).join("")}
            </ul>
        `;
    } else {
        resultDiv.innerHTML = `
            <p>Please select at least one symptom to check.</p>
        `;
    }
}
