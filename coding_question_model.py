import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


# Simulated API-like function to generate dummy coding question data
def generate_coding_question_data(n_samples):
    np.random.seed(42)
    # Features:
    # - code_length (lines of solution)
    # - question_difficulty (1-10)
    # - language_id (0-4, e.g., Python, Java, C++, etc.)
    # - success_rate (0-1, percentage of correct submissions)
    # - submission_count (number of attempts)
    code_length = np.random.randint(5, 500, n_samples)  # Lines of code in solution
    question_difficulty = np.random.randint(1, 11, n_samples)  # Difficulty level
    language_id = np.random.choice(
        [0, 1, 2, 3, 4], n_samples, p=[0.35, 0.25, 0.2, 0.15, 0.05]
    )  # Weighted language distribution
    success_rate = np.random.uniform(0.1, 1.0, n_samples)  # Success rate of submissions
    submission_count = np.random.randint(1, 1000, n_samples)  # Number of submissions

    X = np.column_stack(
        (code_length, question_difficulty, language_id, success_rate, submission_count)
    )

    # Target: coding question quality score (0-100)
    # Higher quality: moderate difficulty, high success rate, reasonable submissions
    y = (
        100
        - 0.05 * X[:, 0]  # Shorter solutions slightly increase quality
        + 5 * (10 - X[:, 1])  # Moderate difficulty (not too hard) increases quality
        + 3 * X[:, 2]  # Certain languages may slightly affect quality
        + 50 * X[:, 3]  # Higher success rate strongly increases quality
        - 0.02 * X[:, 4]  # Too many submissions may indicate poor question clarity
        + np.random.normal(0, 5, n_samples)
    )  # Noise
    y = np.clip(y, 0, 100)  # Ensure scores are between 0 and 100

    return X, y


# Generate dummy dataset for coding questions
n_samples = 5000
X, y = generate_coding_question_data(n_samples)

# Split and scale data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# Define custom TensorFlow model
class CodingQuestionModel(tf.keras.Model):
    def __init__(self):
        super(CodingQuestionModel, self).__init__()
        self.dense1 = tf.keras.layers.Dense(64, activation="relu", input_shape=(5,))
        self.batch_norm1 = tf.keras.layers.BatchNormalization()
        self.dense2 = tf.keras.layers.Dense(32, activation="relu")
        self.batch_norm2 = tf.keras.layers.BatchNormalization()
        self.dropout = tf.keras.layers.Dropout(0.3)
        self.output_layer = tf.keras.layers.Dense(1, activation="sigmoid")

    def call(self, inputs, training=False):
        x = self.dense1(inputs)
        x = self.batch_norm1(x, training=training)
        x = self.dense2(x)
        x = self.batch_norm2(x, training=training)
        if training:
            x = self.dropout(x)
        return self.output_layer(x) * 100  # Scale output to 0-100


# Instantiate and compile model
model = CodingQuestionModel()
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss="mse", metrics=["mae"]
)

# Train model
history = model.fit(
    X_train_scaled,
    y_train,
    validation_data=(X_test_scaled, y_test),
    epochs=50,
    batch_size=32,
    verbose=1,
)

# Evaluate model
test_loss, test_mae = model.evaluate(X_test_scaled, y_test, verbose=0)
print(f"\nTest MAE: {test_mae:.2f} (Mean Absolute Error in question quality score)")

# Example prediction
sample_input = scaler.transform(
    [[100, 5, 1, 0.8, 50]]
)  # Example: 100 lines, difficulty 5, language 1, 80% success, 50 submissions
predicted_score = model.predict(sample_input)
print(f"Predicted coding question quality score: {predicted_score[0][0]:.2f}")
