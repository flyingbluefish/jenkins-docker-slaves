FROM ubuntu

ENV JENKINS_UID=1000
ENV JENKINS_GID=1000

RUN apt-get update
RUN apt-get install -y openjdk-8-jdk
RUN apt-get install -y openssh-client
RUN apt-get install -y rsyslog
RUN apt-get install -y sudo unzip curl

RUN echo 'root:root' | chpasswd

# Install Jenkins
RUN mkdir -p /var/log/jenkins /var/lib/jenkins /usr/bin/jenkins

RUN groupadd -g $JENKINS_GID jenkins
RUN useradd jenkins -d /var/lib/jenkins -u $JENKINS_UID -g $JENKINS_GID -s /bin/bash
RUN echo 'jenkins:jenkins' | chpasswd

# Install SSH configuration
ADD resources/ssh-files /root/.ssh
RUN chmod 0700 /root
RUN chmod 0600 /root/.ssh/id_rsa
RUN chmod 0644 /root/.ssh/id_rsa.pub
RUN chmod 0700 /root/.ssh

ADD resources/ssh-files /var/lib/jenkins/.ssh
RUN chown -R jenkins:jenkins /var/lib/jenkins/.ssh
RUN chmod 0700 /var/lib/jenkins/
RUN chmod 0600 /var/lib/jenkins/.ssh/id_rsa
RUN chmod 0644 /var/lib/jenkins/.ssh/id_rsa.pub
RUN chmod 0700 /var/lib/jenkins/.ssh

ADD resources/runner.sh /usr/bin/jenkins/run.sh

ADD http://mirrors.jenkins-ci.org/war/latest/jenkins.war /usr/lib/jenkins/jenkins.war

#ADD jenkins-plugins-install/install-plugins.sh /var/lib/jenkins/install-plugins.sh
#ADD jenkins-plugins-install/jenkins-support /var/lib/jenkins/jenkins-support
#RUN mkdir -p /var/lib/jenkins/plugins
#RUN bash /var/lib/jenkins/install-plugins.sh git mailer ssh-credentials ssh-slaves

RUN chown -R jenkins:jenkins /var/log/jenkins
RUN chown -R jenkins:jenkins /var/lib/jenkins
RUN chown -R jenkins:jenkins /usr/lib/jenkins

# Declarations
CMD /usr/sbin/rsyslogd
CMD bash /usr/bin/jenkins/run.sh


