from ollama import Client

from services.db_service import get_latest_prediction


client = Client(
    host="http://host.docker.internal:11434"
)


def ask_llm(question: str) -> str:

    latest = get_latest_prediction()

    if latest:
        (
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear,
            prediction,
            confidence,
        ) = latest

        machine_context = f"""
Machine Type: {machine_type}
Air Temperature: {air_temp} K
Process Temperature: {process_temp} K
Rotational Speed: {rotational_speed} RPM
Torque: {torque} Nm
Tool Wear: {tool_wear} minutes

Prediction: {prediction}
Confidence: {confidence}%
"""
    else:
        machine_context = "No machine data available."

    system_prompt = f"""
You are an Industrial AI Maintenance Copilot.

Use ONLY the machine data below.

{machine_context}

Explain the prediction.
Recommend maintenance.
Keep the answer under 200 words.
"""

    try:

        response = client.chat(
            model="qwen2.5:1.5b",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        print(response)

        return response["message"]["content"]

    except Exception as e:

        print("OLLAMA ERROR:", e)

        return f"Error talking to Ollama: {e}"