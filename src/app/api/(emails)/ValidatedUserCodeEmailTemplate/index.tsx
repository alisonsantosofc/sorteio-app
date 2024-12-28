interface ValidatedUserCodeEmailTemplateStringProps {
  code: string;
	userName: string;
}

export const validatedUserCodeEmailTemplateString = ({ code, userName }: ValidatedUserCodeEmailTemplateStringProps) => {
	return (
		`
		<div style="padding: 1.5rem;">
    <img src="https://i.ibb.co/sVx6trz/logo.png" alt="english free" style="max-width: 100%; height: auto; display: block; margin-bottom: 1rem;">
    <h1 style="margin-top: 1rem; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Verificação de email</h1>
    <p style="font-size: 1rem; margin-bottom: 0.25rem;">Olá <strong>${userName}</strong>, para validar o seu endereço de email você vai precisar desse código de verificação:</p>
    <span style="font-size: 1.25rem; font-weight: bold; margin-bottom: 2rem;">${code}</span>
    <p style="font-size: 1rem; margin-bottom: 1rem;">Você pode entrar em contato com o desenvolvedor se estiver enfrentando algum problema através desse endereço de email: <a href="mailto:${process.env.SUPPORT_EMAIL_ADDRESS}">${process.env.SUPPORT_EMAIL_ADDRESS}</a></p>
    <p style="font-size: 1rem; margin-bottom: 1.5rem;">Se você recebeu esse email por engano. Por favor, ignore esse conteúdo!</p>
    <strong style="font-size: 1rem; font-weight: bold;">Equipe English Free</strong>
    </div>`
	);
};
