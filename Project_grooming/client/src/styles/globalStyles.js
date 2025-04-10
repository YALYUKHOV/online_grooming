import { colors } from './colors';

export const globalStyles = {
    // Основные стили
    body: {
        backgroundColor: colors.primary,
        color: colors.textDark,
        fontFamily: '"Roboto", "Arial", sans-serif',
        margin: 0,
        padding: 0,
    },

    // Контейнеры
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },

    // Кнопки
    button: {
        primary: {
            backgroundColor: colors.brown,
            color: colors.white,
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: colors.lightBrown,
            }
        },
        secondary: {
            backgroundColor: colors.gold,
            color: colors.textBrown,
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: colors.lightGold,
            }
        }
    },

    // Карточки
    card: {
        backgroundColor: colors.white,
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },

    // Заголовки
    heading: {
        h1: {
            color: colors.textBrown,
            fontSize: '2.5rem',
            marginBottom: '20px',
        },
        h2: {
            color: colors.textBrown,
            fontSize: '2rem',
            marginBottom: '15px',
        },
        h3: {
            color: colors.textBrown,
            fontSize: '1.5rem',
            marginBottom: '10px',
        }
    },

    // Формы
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: `1px solid ${colors.lightBrown}`,
        marginBottom: '10px',
        width: '100%',
        '&:focus': {
            outline: 'none',
            borderColor: colors.brown,
        }
    },

    // Сообщения
    message: {
        success: {
            backgroundColor: colors.success,
            color: colors.white,
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
        },
        error: {
            backgroundColor: colors.error,
            color: colors.white,
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
        }
    }
}; 