FROM ubuntu

ENV echo $URL


ENV JENKINS_UID=1000
ENV JENKINS_GID=1000
ENV JENKINS_HOME=/home/jenkins
ENV REMOTE_FSROOT=/var/lib/jenkins

RUN apt-get update
RUN apt-get install -y openjdk-8-jdk
RUN apt-get install -y rsyslog
RUN apt-get install -y openssh-server

# get useful packages

RUN apt-get install -y curl sudo unzip
RUN apt-get install -y vim
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install nodejs

# get your packages
RUN apt-get install -y build-essential gcc g++ unzip

# setup sshd

RUN mkdir /var/run/sshd

RUN echo 'root:root' | chpasswd

RUN sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#RSAAuthentication.*/RSAAuthentication yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#SyslogFacility.*/SyslogFacility AUTH/' /etc/ssh/sshd_config
RUN sed -i 's/SyslogFacility.*/SyslogFacility AUTHPRIV/' /etc/ssh/sshd_config
RUN sed -i 's/#LogLevel.*/LogLevel DEBUG3/' /etc/ssh/sshd_config
RUN sed -i 's/LogLevel.*/LogLevel DEBUG3/' /etc/ssh/sshd_config
RUN sed -i 's/UsePAM yes/UsePAM no/' /etc/ssh/sshd_config

#EXPOSE 22

RUN groupadd -g $JENKINS_GID jenkins
RUN useradd jenkins -d $JENKINS_HOME -u $JENKINS_UID -g $JENKINS_GID -s /bin/bash

RUN echo 'jenkins:jenkins' | chpasswd
RUN mkdir -p $JENKINS_HOME
RUN chmod -R a+w $JENKINS_HOME
RUN chown -R jenkins:jenkins $JENKINS_HOME

# for workspace 
# -v option in dockerrun.sh have this location attached to external directory.
RUN mkdir -p $REMOTE_FSROOT
RUN chmod a+rw $REMOTE_FSROOT

# Install SSH configuration
# (Should allow master's SSH request.)
ADD ssh-files /root/.ssh
RUN chmod 0700 /root
RUN chmod 0600 /root/.ssh/id_rsa
RUN chmod 0644 /root/.ssh/id_rsa.pub
RUN chmod 0600 /root/.ssh/authorized_keys
RUN chmod 0700 /root/.ssh

ADD ssh-files $JENKINS_HOME/.ssh
RUN chown -R jenkins:jenkins $JENKINS_HOME/.ssh
RUN chmod 0700 $JENKINS_HOME
RUN chmod 0600 $JENKINS_HOME/.ssh/id_rsa
RUN chmod 0600 $JENKINS_HOME/.ssh/authorized_keys
RUN chmod 0644 $JENKINS_HOME/.ssh/id_rsa.pub
RUN chmod 0700 $JENKINS_HOME/.ssh

# RUN chown -R jenkins:jenkins $JENKINS_HOME
# RUN usermod -G wheel jenkins

ADD agent.jar $JENKINS_HOME/agent.jar
ADD junit $JENKINS_HOME/junit
RUN bash $JENKINS_HOME/junit/install.sh

CMD    /usr/sbin/rsyslogd
CMD    /usr/sbin/sshd -D
CMD    java -jar $JENKINS_HOME/agent.jar -jnlpUrl $URL -workDir $REMOTE_FSROOT


